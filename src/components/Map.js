
import { useState, useEffect } from "react"
import React from 'react'
import { Container, Row } from "react-bootstrap"
import Land from "./Land"


const createMapArray = () => {
    let allMapsArray = []
    let mapArray = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            mapArray.push({ id: (i * 10) + j, owner: null, type: "" })
        }
        allMapsArray.push(mapArray)
        mapArray = []
    }
    return allMapsArray
}
const splitArrayMap = createMapArray()
console.log(splitArrayMap);

const Map = () => {

    return (

        <Container>
            <Row>
                 {splitArrayMap[0].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>
            <Row>
                {splitArrayMap[1].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>
            <Row>
                {splitArrayMap[2].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>
            <Row>
                {splitArrayMap[3].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>       
            <Row>
             {splitArrayMap[4].map((land) => <Land id={land.id} name={land.name} />)} 
            </Row>
            <Row>
                 {splitArrayMap[5].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>
            <Row>
              {splitArrayMap[6].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>     
            <Row>
              {splitArrayMap[7].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>       
            <Row>
                  {splitArrayMap[8].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>
            <Row>
               {splitArrayMap[9].map((land) => <Land id={land.id} name={land.name} />)}
            </Row>


        </Container>

    )
}

export default Map

