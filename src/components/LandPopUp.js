import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap"
const LandPopUp = (props) => {
    const [isOwned, setIsOwned] = useState(props.isOwned)



    const handlePurchaseClick = async (id) => {
        try {

            await props.contract.methods.purchase(props.hexId).send()
            const newOwner = await props.contract.methods.getOwner(id).call()
            const isOwned = newOwner === props.accounts[0]
            if (isOwned) {
               let button = document.getElementById(props.id)
               button.style.backgroundColor = "RED"
            }
        } catch (err) {
            console.log("purchase rejected");
        }
    }

    return (
        <>
            <Card style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                {/* <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup> */}
                <Card.Body>
               
                    {!isOwned && <Button variant='primary' onClick={() => { handlePurchaseClick(props.id) }}>Purchase!</Button>}
                </Card.Body>
            </Card>

        </>
    )
}

export default LandPopUp