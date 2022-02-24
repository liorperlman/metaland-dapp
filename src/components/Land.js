import { Button } from "react-bootstrap"
import React, { useState, useEffect } from "react"
import { usePurchaseLandContract } from "../hooks/usePurchaseLandContract"

const Land = (props) => {
    const [contract, accounts] = usePurchaseLandContract()
    const [color, setColor] = useState("primary")
    const [buttonIsReady, setButtonIsReady] = useState(false)
    const hexId = `0x00000000000000000000000000000000000000${props.id.toString(16)}`
// console.log(hexId)
    const markAsOwned = (button, isOwned) => {
      
    }
    useEffect(() => {
        const markAsOwnedIfNeeded = async (id) => {
            let button = document.getElementById(id)
            try {
                const maybeOwner = await contract.methods.getOwner(hexId).call()
                console.log(maybeOwner);
                const isOwned = maybeOwner !== "0x0000000000000000000000000000000000000000"
                console.log(isOwned && buttonIsReady);
                if (isOwned) {
                    setColor("danger")
                    button.classList.add('disabled')
                    setButtonIsReady(true)
                }
            } catch (err) {
                console.log("cant get owner")
            }
        }
        markAsOwnedIfNeeded(props.id)

    })

    const handleClick = async (id) => {

        // e.preventDefault()
        let button = document.getElementById(id)
        let hexId = `0x00000000000000000000000000000000000000${id.toString(16)}`
        try {
            const result = await contract.methods.purchase(hexId).send()
            const newOwner = await contract.methods.getOwner(id).call()
            const isOwned = newOwner === accounts[0]
            console.log(isOwned, newOwner)
            if (isOwned) {
                setColor("danger")
                button.classList.add('disabled')
               setButtonIsReady(true)
            }
        } catch (err) {
            console.log("purchase rejected");
        }
    }


    return (
<Button className="w-100 h-100 rounded-0" variant = {color} style={{ outline: "none", boxShadow: "none" }} id={props.id} onClick={() => handleClick(props.id)} key={props.id}>
    {props.id}
        </Button>
    )
}

export default Land