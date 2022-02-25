import { Button } from "react-bootstrap"
import React, { useState, useEffect } from "react"

const Land = (props) => {
    const [color, setColor] = useState("primary")
    const [isDisabled, setIsDisabled] = useState("")
    const [buttonIsReady, setButtonIsReady] = useState(false)
    const hexId = `0x00000000000000000000000000000000000000${props.id.toString(16)}`

    const handleClick = async (id) => {
        try {
            await props.contract.methods.purchase(hexId).send()
            const newOwner = await props.contract.methods.getOwner(id).call()
            const isOwned = newOwner === props.accounts[0]

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
            if(props.contract)
            try {
                const maybeOwner = await props.contract.methods.getOwner(hexId).call()
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

    }, [props.contract])


    return (
        <>
            {buttonIsReady && <Button className={`w-100 h-100 rounded-0 ${isDisabled}`} variant={color} style={{ outline: "none", boxShadow: "none" }} id={props.id} onClick={async () => handleClick(props.id)} key={props.id}>
                {props.id}
            </Button>}
        </>
    )

}

export default Land