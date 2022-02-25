import { Button } from "react-bootstrap"
import React, { useState, useEffect } from "react"
import { usePurchaseLandContract } from "../hooks/usePurchaseLandContract"

const Land = (props) => {
    const [contract, accounts] = usePurchaseLandContract()
    const [color, setColor] = useState("primary")
    const [isDisabled, setIsDisabled] = useState("")
    const [buttonIsReady, setButtonIsReady] = useState(false)
    const hexId = `0x00000000000000000000000000000000000000${props.id.toString(16)}`

    const handleClick = async (id) => {
        let hexId = `0x00000000000000000000000000000000000000${id.toString(16)}`
        try {
            await contract.methods.purchase(hexId).send()
            const newOwner = await contract.methods.getOwner(id).call()
            const isOwned = newOwner === accounts[0]

            if (isOwned) {
                markAsOwned()
            }
        } catch (err) {
            console.log("purchase rejected");
        }
    }

    const markAsOwned = () => {
        setColor("danger")
        setIsDisabled("disabled")
        setButtonIsReady(true)

    }
    useEffect(() => {
        const markAsOwnedIfNeeded = async () => {
            if(contract)
            try {
                const maybeOwner = await contract.methods.getOwner(hexId).call()
                const isOwned = maybeOwner !== "0x0000000000000000000000000000000000000000"
                if (isOwned) {
                    markAsOwned()
                } else {
                    setButtonIsReady(true)
                }

            } catch (err) {
                console.log("cant get owner")
            }
        }
        markAsOwnedIfNeeded()

    }, [contract])


    return (
        <>
            {buttonIsReady && <Button className={`w-100 h-100 rounded-0 ${isDisabled}`} variant={color} style={{ outline: "none", boxShadow: "none" }} id={props.id} onClick={async () => handleClick(props.id)} key={props.id}>
                {props.id}
            </Button>}
        </>
    )

}

export default Land