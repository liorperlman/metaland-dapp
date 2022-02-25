import { Button } from "react-bootstrap"
import React, { useState, useEffect } from "react"
import Popup from 'reactjs-popup';
import LandPopUp from './LandPopUp'
const Land = (props) => {
    const [color, setColor] = useState("primary")
    const [isDisabled, setIsDisabled] = useState("")
    const [isOwned, setIsOwned] = useState(false)
    const [buttonIsReady, setButtonIsReady] = useState(false)
    const hexId = `0x00000000000000000000000000000000000000${props.id.toString(16)}`
    const roadArray = [11, 21, 31, 34, 41, 44, 51, 54, 61, 62, 63, 64, 65, 66, 67, 68, 76, 78, 86, 88, 98]
    const parkArray = [8, 9, 18, 19]


    const markAsOwned = () => {
        setColor("danger")
        setButtonIsReady(true)

    }

    const markAsRoad = () => {
        setColor("secondary")
        setIsDisabled("disabled")
        setButtonIsReady(true)
    }

    const markAsPark = () => {
        setColor("success")
        setIsDisabled("disabled")
        setButtonIsReady(true)
    }
    const markLand = async () => {
        if (props.contract)
            try {
                const maybeOwner = await props.contract.methods.getOwner(hexId).call()
                const isOwnedTemp = maybeOwner !== "0x0000000000000000000000000000000000000000"
                setIsOwned(isOwnedTemp)
                const isRoad = roadArray.includes(props.id)
                const isPark = parkArray.includes(props.id)

                if (isOwnedTemp) {
                    markAsOwned()
                } else if (isRoad) {
                    markAsRoad()
                } else if (isPark) {
                    markAsPark()
                } else {
                    setButtonIsReady(true)
                }
            } catch (err) {
                console.log("cant get owner")
            }
        }

    useEffect(()=>markLand(),[props.contract])


    return (
        <>

            <Popup trigger={ <Button className={`w-100 h-100 rounded-0 ${isDisabled}`} variant={color} style={{ outline: "none", boxShadow: "none" }} id={props.id} key={props.id}>
            {props.id}
            </Button>} position="right center">
                <LandPopUp  isOwned = {isOwned} id = {props.id} hexId = {hexId} contract = {props.contract}></LandPopUp>
            </Popup>
        </>
    )

}

export default Land