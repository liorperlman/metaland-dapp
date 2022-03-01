import { Button } from "react-bootstrap"
import React, { useEffect, useReducer } from "react"
import Popup from 'reactjs-popup';
import LandPopUp from './LandPopUp'

export const ACTIONS = { AsOwned: 'setAsOwned', AsRoad: 'setAsRoad', AsPark: 'setAsPark', AsFree: 'setAsFree' }

const roadArray = [11, 21, 31, 34, 41, 44, 51, 54, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 76, 78, 86, 88, 98]
const parkArray = [8, 9, 18, 19, 121, 122, 131, 132, 141, 142, 151, 152]

const reducer = (land, action) => {
    switch (action.type) {
        case ACTIONS.AsOwned:
            return { ...land, color: 'danger', isOwned: true }
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
        isDisabled: "",
        isOwned: false
    }

    const ownersArray = props.ownersArray
    const [land, dispatch] = useReducer(reducer, initialState)
    const hexId = `0x00000000000000000000000000000000000000${props.id.toString(16)}`

    const markLand = async () => {
        if (props.contract)
            try {
                const isOwned = ownersArray.includes(props.id)
                if (isOwned) {
                    dispatch({ type: ACTIONS.AsOwned })
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
    }, [ownersArray])


    return (
        <>
            <Popup trigger={<Button className={`w-100 h-100 rounded-0 ${land.isDisabled}`} variant={land.color} style={{ outline: "none", boxShadow: "none" }} id={props.id} key={props.id}>
                {props.id}
            </Button>} position="right center">
                <LandPopUp id={props.id} hexId={hexId} contract={props.contract} dispatch={dispatch} account={props.accounts} isOwned1={land.isOwned} ></LandPopUp>
            </Popup>
        </>
    )

}

export default Land