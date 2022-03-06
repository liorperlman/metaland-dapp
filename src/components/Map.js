
import React, { useReducer, useEffect, useState} from 'react'
import { Container, Row, Col } from "react-bootstrap"
import Land from "./Land"
import { usePurchaseLandContract } from "../hooks/usePurchaseLandContract"
import { pricesArray } from '../config'



const createMapArray = () => {
    let allMapsArray = []
    let mapArray = []
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 50; j++) {
            mapArray.push({ id: (i * 50) + j, owner: null, type: "" , price: pricesArray[i*50 + j]})
        }
        allMapsArray.push(mapArray)
        mapArray = []
    }
    return allMapsArray
}

const getOwnersArray = (owners) => {
    return owners.map((value, index) => [value, index]).filter(x => x[0] !== "0x0000000000000000000000000000000000000000").map((value) => value[1])
}
const splitArrayMap = createMapArray()
console.log(splitArrayMap);

const OwnersReducer = (ownersArray, action ) => {
            return  getOwnersArray(action.payload)
}

const Map = () => {
    const [contract, accounts] = usePurchaseLandContract()
    const [ownersArray, dispatch] = useReducer(OwnersReducer,[])
    const [mapIsReady, setMapIsReady] = useState(false);

    useEffect(async () => {
        if (contract)
            try {
                const owners = await contract.methods.getOwners().call()
                dispatch({type:"addOwners", payload:owners})
            }
            catch (e) {
                console.log("cant get owners")
            }
    },[contract, accounts])


    useEffect(() => {
        if(contract && accounts)
            setMapIsReady(true)
    },[contract, accounts])
    
    window.ethereum.on('disconnect', () => {
        console.log("MetaMask discconnected")
    })
    return (
        <>
       { mapIsReady ?
        <Container>
            <Row xs={'auto'}>
                {splitArrayMap[0].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[1].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts}  ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[2].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[3].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[4].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[5].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[6].map((land) =>
                    <Col key={land.id} className="p-0 m-0 ">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[7].map((land) =>
                    <Col key={land.id} className="p-0 m-0 ">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[8].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[9].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[10].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[11].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[12].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[13].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[14].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row xs={'auto'}>
                {splitArrayMap[15].map((land) =>
                    <Col key={land.id} className="p-0 m-0">
                        <Land id={land.id} name={land.name} price={land.price} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
        </Container> : <div>Connect to MetaMask...</div>}
        </>
    )
}

export default Map

