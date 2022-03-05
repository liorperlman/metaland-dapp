import React, { useState, useEffect, useReducer } from 'react';
import { Card, Button, Form } from "react-bootstrap"
import { ACTIONS } from './Land'
import TicTac from "../games/TicTac"
import ApproveButton from "./ApproveButton"
import MemoryGame from "../games/MemoryGame/MemoryGame"

const POPUP_ACTIONS = { isOwned: "isOwned", isOwnedByMe: "isOwnedByMe", isNotOwnedByMe: "isNotOwnedByMe", transferClicked: "transferClicked" }
const reducer = (popup, action) => {
    switch (action.type) {
        case POPUP_ACTIONS.isOwned:
            return { ...popup, isOwned: true }
        case POPUP_ACTIONS.isOwnedByMe:
            return { ...popup, isOwnedByMe: true, isOwned: true }
        case POPUP_ACTIONS.isNotOwnedByMe:
            return { ...popup, isOwnedByMe: false, isTransferClicked: false }
        case POPUP_ACTIONS.transferClicked:
            return { ...popup, isTransferClicked: true}

        default:
            break;
    }

}

const LandPopUp = ({ id, hexId, contract, dispatch, account, price, isOwned1 }) => {
    const initialState = {
        id: id,
        isOwned: isOwned1,
        isOwnedByMe: false,
        isEven: id % 2 === 0 ? true : false,
        isTransferClicked: false
    }
    const [popup, dispatchPopup] = useReducer(reducer, initialState)
    const [accountId, setAccountId] = useState("")
    const [newPrice, setNewPrice] = useState(price)
    const handlePurchaseClick = async (id) => {
        try {
            await contract.methods.purchase(hexId, price).send({value: price})
            const newOwner = await contract.methods.getOwner(id).call()
            if (newOwner === account[0]) {
                dispatch({ type: ACTIONS.AsOwned })
                dispatchPopup({ type: POPUP_ACTIONS.isOwned })
            }
        } catch (err) {
            console.log("purchase rejected");
        }
    }
    const handleSetPriceClick = async (id) => {
        try {
            console.log(newPrice* 1000000000000000000)
            const hexPrice = (newPrice* 1000000000000000000).toString(16)
            await contract.methods.setPrice(hexId, hexPrice).send()
           
        } catch (err) {
            console.log("purchase rejected");
        }
    }

    const isValidAccountId = (accountId) => {
        var re = /[0-9A-Fa-f]{6}/g;
        return (re.test(accountId) && accountId.length === 42) ? true : false
    }

    const handleTransfer = async () => {
        if (isValidAccountId(accountId)) {
            console.log(account[0], accountId, id);
            try {
                await contract.methods.transferFrom(account[0], accountId, id).send({value:10000000000000000000})
                dispatchPopup({ type: POPUP_ACTIONS.isNotOwnedByMe })
                console.log("transfer succeeded")

            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        const checkIfOwnedByMe = async () => {
            try {
                const newOwner = await contract.methods.ownerOf(hexId).call()
                if (newOwner === account[0]) {
                    dispatchPopup({ type: POPUP_ACTIONS.isOwnedByMe })
                }
            } catch (e) {
                console.log("owner is not found");
            }
        }

        checkIfOwnedByMe()
    })
    const test = { width: '42rem', height: '42rem' }
    const test2 = { width: '32rem', height: '32rem' }
    return (
        <>
            <Card style={popup.isEven && popup.isOwned ? test : test2}>
                <Card.Header as="h5">Land {id}</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome!</Card.Title>
                    <Card.Text>
                        Some content
                    </Card.Text>

                    {popup.isEven && popup.isOwned && <MemoryGame />}
                    {(!popup.isEven && popup.isOwned) && <TicTac />}
                    {!popup.isOwned && <Button variant='primary' onClick={async () => { handlePurchaseClick(id) }}>Purchase!</Button>}
                </Card.Body>
                <Card.Body>

                    {popup.isOwnedByMe && <Button variant='primary' onClick={async () => { dispatchPopup({type:POPUP_ACTIONS.transferClicked}) }}>Transfer! </Button>}
                    {popup.isTransferClicked &&
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Enter account Id:</Form.Label>
                                <Form.Control type="hex" defaultValue={accountId} placeholder="0x0000000000000000000000000000000000000000" onChange={(e) => setAccountId(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button variant="primary" onClick={async (e) => { handleTransfer() }}>
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>}
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Enter New Price:</Form.Label>
                                <Form.Control type="hex" placeholder={(price/1000000000000000000)} onChange={(e) => setNewPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button variant="primary" onClick={async (e) => { handleSetPriceClick() }}>
                                    Change Price
                                </Button>
                            </Form.Group>
                        </Form>
                        {/* <ApproveButton id = {id} contract = {contract} account = {account[0]}></ApproveButton> */}
                </Card.Body>
            </Card>

        </>
    )
}


export default LandPopUp