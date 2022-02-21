
import { useState, useEffect } from "react"
import React from 'react'
import { Container } from "react-bootstrap"
import  Land  from "./Land"

const mapArray = [{ id: 0, name: "dolev" }, { id: 1, name: "lior" }]
const Map = () => {

    return (

            <Container>
                <div>
                {mapArray.map((land) => <Land id={land.id} name={land.name} />)}
                </div>
            </Container>

    )
}

export default Map

