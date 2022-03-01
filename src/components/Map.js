
// import { useState, useEffect } from "react"
import React, { useReducer, useEffect} from 'react'
import { Container, Row, Col } from "react-bootstrap"
import Land from "./Land"
import { usePurchaseLandContract } from "../hooks/usePurchaseLandContract"



const createMapArray = () => {
    let allMapsArray = []
    let mapArray = []
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 20; j++) {
            mapArray.push({ id: (i * 20) + j, owner: null, type: "" })
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
            return action.payload
}

const Map = () => {
    const [contract, accounts] = usePurchaseLandContract()
    const [ownersArray, dispatch] = useReducer(OwnersReducer,[])

    useEffect(async () => {
        if (contract)
            try {
                const owners = await contract.methods.getOwners().call()
                const tempOwnersArray = getOwnersArray(owners)
                dispatch({type:"addOwners", payload:tempOwnersArray})
            }
            catch (e) {
                console.log("cant get owners")
            }
    },[contract, accounts])
    return (

        <Container>
            <Row>
                {splitArrayMap[0].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[1].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts}  ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[2].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[3].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[4].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[5].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[6].map((land) =>
                    <Col key={land.id} className="p-0 m-1 ">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[7].map((land) =>
                    <Col key={land.id} className="p-0 m-1 ">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[8].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[9].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[10].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[11].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[12].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[13].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[14].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
            <Row>
                {splitArrayMap[15].map((land) =>
                    <Col key={land.id} className="p-0 m-1">
                        <Land id={land.id} name={land.name} contract={contract} accounts={accounts} ownersArray = {ownersArray} />
                    </Col>)}
            </Row>
        </Container>

    )
}

export default Map

