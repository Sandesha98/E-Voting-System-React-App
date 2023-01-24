import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './homepage.css';
import vote from './vote.jpg';
import Col from 'react-bootstrap/Col';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import getWeb3 from './getWeb3';
import HelloWorld from './contracts/HelloWorld.json';
import Axios from 'axios';
import $ from 'jquery';

function HomePage() {
  const navigate= useNavigate();
  const location = useLocation();
  const [idd , setId] = useState(0);
  const [storageValue, setStorageValue] = useState(0);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [registrationChecked, setRegistrationChecked] = useState(false);
  const [votingChecked, setVotingChecked] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  
  
  useEffect(()=>{
    Axios.get(`http://localhost:3001/getExistRecord/${location.state.cms_id}`).then((res)=>{
     //console.log("New",res.data[0].result);
    setId(res.data[0].result)
   });
   Axios.get(`http://localhost:3001/manageElectionData`).then((res)=>{
    setRegistrationChecked((res.data[0]).startRegistration);
    setVotingChecked((res.data[0]).startVoting);
  });
  
  async function loadWeb3() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
  
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HelloWorld.networks[networkId];
      const instance = new web3.eth.Contract(
        HelloWorld.abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log(instance);
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      
    } catch (error) {

      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }
  loadWeb3();
  
  
   
},[]);

async function fetchData(){
  if(contract) {
    const response = await contract.methods.userVoted(location.state.cms_id).call();
    setHasVoted(response);
    console.log("User cms response",response);
  }
 
}
fetchData();

 
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
        {((hasVoted == true) || (registrationChecked==1 || votingChecked==0)) ? 
        <><Button variant="primary" disabled >Vote</Button></> : 
        <><Button variant="primary" onClick={()=>navigate('cast-vote',{state:{cms_id: location.state.cms_id}})} >Vote</Button></>}
        
      </Card.Body>
   
    </Card>
    </center>   
    
      </Col>
      </Row>
   
    </Container>
  );
}

export default HomePage;