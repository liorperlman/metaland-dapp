import { Button } from "react-bootstrap"
import React, { useEffect, useReducer, useState } from "react"
import Popup from 'reactjs-popup';
import LandPopUp from './LandPopUp'

export const ACTIONS = { AsOwned: 'setAsOwned', AsRoad: 'setAsRoad', AsPark: 'setAsPark', AsFree: 'setAsFree' }

const roadArray = [11, 21, 31, 34, 41, 44, 51, 54, 61, 62, 63, 64, 65, 66, 67, 68, 76, 78, 86, 88, 98]
const parkArray = [8, 9, 18, 19]

const reducer = (land, action) => {
    switch (action.type) {
        case ACTIONS.AsOwned:
            return { ...land, color: 'danger' }
        case ACTIONS.AsRoad:
            return { ...land, color: 'secondary', isDisabled: 'disabled' }
        case ACTIONS.AsPark:
            return { ...land, color: 'success', isDisabled: 'disabled' }
        default:
            return land;
    }
}
const Land = (props) => {
    const initialState = {
        id: props.id,
        color: "primary",
        isDisabled: ""
    }

    const [land, dispatch] = useReducer(reducer, initialState)
    const [isOwned, setIsOwned] = useState(false)
    const hexId = `0x00000000000000000000000000000000000000${props.id.toString(16)}`

    console.log(props.accounts)
    const markLand = async () => {
        if (props.contract)
            try {
                const maybeOwner = await props.contract.methods.getOwner(hexId).call()
                const isOwned = maybeOwner !== "0x0000000000000000000000000000000000000000"
                if (isOwned) {
                    dispatch({ type: ACTIONS.AsOwned })
                    setIsOwned(true)
                } else {
                    const isRoad = roadArray.includes(props.id)
                    if (isRoad) {
                        dispatch({ type: ACTIONS.AsRoad })
                    } else {
                        const isPark = parkArray.includes(props.id)
                        if (isPark) {
                            dispatch({ type: ACTIONS.AsPark })
                        }
                    }
                }
            } catch (err) {
                console.log("cant get owner")
            }
    }
    useEffect(() => {
        markLand()
    },[props.contract])


    return (
        <>

            <Popup trigger={<Button className={`w-100 h-100 rounded-0 ${land.isDisabled}`} variant={land.color} style={{ outline: "none", boxShadow: "none" }} id={props.id} key={props.id}>
                {props.id}
            </Button>} position="right center">
                <LandPopUp id={props.id} hexId={hexId} contract={props.contract} dispatch={dispatch} account={props.accounts} isOwned1={isOwned} ></LandPopUp>
            </Popup>
        </>
    )

}

export default Land