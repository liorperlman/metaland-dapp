import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
const ApproveButton = ({contract, id, account}) => {
    const [accountId, setAccountId]= useState("")

    const handleApprove = async () => {
        try {
            await contract.methods.approve(accountId, id).send()
        }catch (err){
            console.log(err)
        }

    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Enter account Id to approve:</Form.Label>
                </Form.Group>
                <Form.Control type="hex" defaultValue={accountId} placeholder="0x0000000000000000000000000000000000000000" onChange={(e) => setAccountId(e.target.value)} />
                <Button variant ="primary" onClick={()=>{handleApprove()}}>Approve</Button>
            </Form>
        </>
    )

}

export default ApproveButton