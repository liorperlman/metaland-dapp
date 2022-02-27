import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from "react-bootstrap"
import { ACTIONS } from './Land'
import TicTac from "../games/TicTac"
import MemoryGame from "../games/MemoryGame/MemoryGame"


const LandPopUp = ({ id, hexId, contract, dispatch, account, isOwned1 }) => {
    const [isOwned, setIsOwned] = useState(isOwned1)
    const [isOwnedByMe, setIsOwnedByMe] = useState(false)
    const [accountId, setAccountId] = useState("")
    console.log(hexId);
    const [isTransferClicked, setIsTransferClicked] = useState(false)

    const handlePurchaseClick = async (id) => {
        try {
            await contract.methods.purchase(hexId).send()
            const newOwner = await contract.methods.getOwner(id).call()
            const isOwned = newOwner === account[0]
            if (isOwned) {
                dispatch({ type: ACTIONS.AsOwned })
                setIsOwned(true)
            }
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
                    let result = await contract.methods.transferFrom(account[0], accountId, id).send()
                    console.log(result)
                } catch (e) {
                    console.log(e);
                }
            }
        }

        useEffect(() => {
            const checkIfOwnedByMe = async () => {
                try{
                const newOwner = await contract.methods.ownerOf(hexId).call()
                const isOwnedByMe = newOwner === account[0]
                if (isOwnedByMe) {
                    setIsOwnedByMe(true)
                }else
                    setIsOwnedByMe(false)
                }catch(e){
                    console.log("owner is not found");
                }
            }
            
            checkIfOwnedByMe()
        })
            return (
                <>
                    <Card style={{ display: 'flex' }}>
                        <Card.Body>
                            <Card.Title>Land {id}</Card.Title>
                            <Card.Text>
                                Some content
                            </Card.Text>
               
                            {(id%2 ==0 && isOwned) &&  <MemoryGame />}
                            {(id%2 ==1 && isOwned) && <TicTac/>}
                        </Card.Body>
                        <Card.Body>
                            {!isOwned && <Button variant='primary' onClick={async () => { handlePurchaseClick(id) }}>Purchase!</Button>}
                            {isOwnedByMe && <Button variant='primary' onClick={async () => { setIsTransferClicked(true) }}>Transfer! </Button>}
                            {isTransferClicked &&
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Enter account Id:</Form.Label>
                                        <Form.Control type="hex" defaultValue={accountId} placeholder="0x0000000000000000000000000000000000000000" onChange={(e) => setAccountId(e.target.value)} />
                                    </Form.Group>
                                    <Button variant="primary" onClick={async (e) => { handleTransfer() }}>
                                        Submit
                                    </Button>
                                </Form>}
                        </Card.Body>
                    </Card>

                </>
            )
        }
    

        export default LandPopUp