import { Button } from "react-bootstrap"
import React, { useEffect, useReducer } from "react"
import Popup from 'reactjs-popup';
import LandPopUp from './LandPopUp'

export const ACTIONS = { AsOwned: 'setAsOwned', AsRoad: 'setAsRoad', AsPark: 'setAsPark', AsFree: 'setAsFree', priceChanged: "priceChanged" }

const roadArray = [3, 13, 30, 53, 63, 80, 90, 91, 92, 93, 94, 95, 103, 113, 130, 140, 145, 153, 163, 180, 190, 195, 203, 213, 230, 240, 245, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 303, 316, 326, 335, 345, 353, 366, 376, 385, 395, 403, 416, 426, 435, 445, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 485, 495, 503, 508, 526, 535, 545, 553, 558, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 603, 608, 635, 650, 651, 652, 653, 654, 655, 656, 657, 658, 685, 708, 735, 758, 785]
const parkArray = [141, 142, 143, 144, 191, 192, 193, 194, 241, 242, 243, 244, 504, 505, 506, 507, 554, 555, 556, 557, 604, 605, 606, 607]

const reducer = (land, action) => {
    switch (action.type) {
        case ACTIONS.AsOwned:
            return { ...land, color: 'danger', isOwned: true }
        case ACTIONS.AsRoad:
            return { ...land, color: 'secondary', isDisabled: 'disabled' }
        case ACTIONS.AsPark:
            return { ...land, color: 'success', isDisabled: 'disabled' }
        case ACTIONS.priceChanged:
            return { ...land, price: (action.price) }
        default:
            return land;
    }
}

const Land = (props) => {
    const initialState = {
        id: props.id,
        color: "primary",
        isDisabled: "",
        isOwned: false,
        price: props.price
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
            <Popup trigger={<Button className={`w-100 h-100 rounded-0 ${land.isDisabled}`} variant={land.color} style={{ outline: land.isDisabled !== 'disabled' ? "1px solid black":"none", boxShadow: "none" }} id={props.id} key={props.id}>

            </Button>} position="right top">
                <LandPopUp id={props.id} hexId={hexId} contract={props.contract} dispatch={dispatch} account={props.accounts} price={land.price} isOwned1={land.isOwned} ></LandPopUp>
            </Popup>
        </>
    )

}

export default Land