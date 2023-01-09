import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './homepage.css';
import vote from './vote.jpg';
import Col from 'react-bootstrap/Col';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function HomePage() {
  const navigate= useNavigate();
  const location = useLocation();
  const [idd , setId] = useState(0);
  const [registrationChecked, setRegistrationChecked] = useState(false);
  const [votingChecked, setVotingChecked] = useState(false);
  useEffect(()=>{
    Axios.get(`http://localhost:3001/getExistRecord/${location.state.cms_id}`).then((res)=>{
     //console.log(res.data[0].result);
    setId(res.data[0].result)
   });
   Axios.get(`http://localhost:3001/manageElectionData`).then((res)=>{
    setRegistrationChecked((res.data[0]).startRegistration);
    setVotingChecked((res.data[0]).startVoting);
  });
 },[]);
  return (
    <Container>
    <Row className='con'>
    {(idd == 1 || location.state.sem < 7) ? <Col md={4}>
        <center>
      <Card  border="primary" style={{ width: '25rem' }}><br/><br/>
      <Card.Title>Register Panel</Card.Title><br/><br/>
      <Card.Img variant="top" src={vote} /><br/><br/>
      <Card.Body>
        {(idd==1 )?<>
        <Button variant="primary" onClick={()=>navigate('panel-status',{state:{cms_id: location.state.cms_id}})}>Check Status</Button></>:<><Card.Text>You are not eligible to register panel</Card.Text>
        <Button variant="primary" disabled>Register</Button></>}
        
      </Card.Body>  
   
    </Card>
    </center>   
      </Col> : <Col md={4} >
        <center>
      <Card  border="primary" style={{ width: '25rem' }}><br/><br/>
      <Card.Title>Register Panel</Card.Title><br/><br/>
      <Card.Img variant="top" src={vote} /><br/><br/>
      <Card.Body>
        {(registrationChecked == 1)? <><Button variant="primary" onClick={()=>navigate('register-panel')}>Register</Button></>
        : <Button variant="primary" disabled>Register</Button>}
        
      </Card.Body>  
   
    </Card>
    </center>   
      </Col> }
      <Col md={{ span: 4, offset: 4 }}>

      <center>
      <Card border="primary" style={{ width: '25rem' }}><br/><br/>
      <Card.Title>Caste a Vote</Card.Title><br/><br/>
      <Card.Img variant="top" src={vote} /><br/><br/>
      <Card.Body>
        {(registrationChecked==1 || votingChecked==0) ? 
        <><Button variant="primary" disabled >Vote</Button></> : 
        <><Button variant="primary" onClick={()=>navigate('cast-vote')} >Vote</Button></>}
        
      </Card.Body>
   
    </Card>
    </center>   
    
      </Col>
      </Row>
   
    </Container>
  );
}

export default HomePage;