import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Container } from "react-bootstrap";
import './homepage.css';
import ModalVote from './modalVote';
import Axios from 'axios';
export default function CastVote() {
    const [panelData, setPanelData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    useEffect(() => {
        Axios.get("http://localhost:3001/getCandidateDetails").then((res)=>{
            console.log(res.data);
           setPanelData(res.data);
              });      
    }, [])

    return (
        <>
        <Container>
            <Row className='con'>
                {panelData.map((data, k) => (
                    <Col key={k} md={6} sm={8} lg={4}>
                        <center>
                        <Card border="primary" style={{ width: '20rem', height: '24rem'}}>
                            <Card.Img src="https://source.unsplash.com/random" width='320px' height='200px' />

                            <Card.Body>
                                <Card.Title>{data.panelName}</Card.Title>
                                {/* <Card.Text>{`${data.description.substring(0,120)}`}</Card.Text>
                                */}
                            </Card.Body>
                            <Button variant="outline-primary" onClick={() => setModalShow(true)}>Vote</Button>
                        </Card>
                        <br/>
                        </center>
                    </Col>
                ))}
            </Row>
            <ModalVote
        show={modalShow}
        onHide={() => setModalShow(false) } 
        // title={playerData.title}
        // description = {playerData.description}
      />
        </Container><br/><br/>
       
        </>
    )
}