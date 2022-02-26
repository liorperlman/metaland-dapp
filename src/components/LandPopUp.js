import React, { useState } from 'react';
import { Card, Button } from "react-bootstrap"
import { ACTIONS } from './Land'

const LandPopUp = ({ id, hexId, contract, dispatch, account, isOwned1 }) => {
    const [isOwned, setIsOwned] = useState(isOwned1)
    console.log(isOwned);



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
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <Card.Body>

                    {!isOwned && <Button variant='primary' onClick={async() => { handlePurchaseClick(id) }}>Purchase!</Button>}
                </Card.Body>
            </Card>

        </>
    )
}

export default LandPopUp