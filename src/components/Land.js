import { Col, Row, Card, Button } from "react-bootstrap"
import React from "react"
const Land = (props) => {
    const handleClick = (id) => {

        // e.preventDefault()
       let button = document.getElementById(id)
       button.style.backgroundColor = "Black"
       button.style.borderColor = "Black"


    }
    return (
        // <Col id={props.id} key={props.id}>
            <Button className = "w-100 h-100 rounded-0" style = {{outline: "none", boxShadow: "none"}} id = {props.id} onClick={() => handleClick(props.id)} key={props.id}>
            </Button>
        // </Col>
    )
}

export default Land