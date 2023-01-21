import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Container } from "react-bootstrap";
import './homepage.css';
import getWeb3 from './getWeb3';
import $ from 'jquery';
import HelloWorld from './contracts/HelloWorld.json';
import ModalVote from './modalVote';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
const CastVote = () => {
    const [modalShow, setModalShow] = useState(false) 
    const [panelData, setPanelData] = useState([])
    const [winnerNa, setWinnerNa] = useState('')
    const [votee , setVotee] = useState('')
    const [storageValue, setStorageValue] = useState(0)
    const [web3, setWeb3] = useState(null)
    const [accounts, setAccounts] = useState(null)
    const [contract, setContract] = useState(null)
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')
    const navigate = useNavigate()
    // const history = useHistory()
    useEffect(() => {
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
  
          console.log(instance)
          setWeb3(web3)
          setAccounts(accounts)
          setContract(instance)
          fetchData()
        } catch (error) {
  
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      }
      loadWeb3()
    }, []);

    const fetchData = async () => {           
      Axios.get("http://localhost:3001/getCandidateDetails").then((res)=>{
      console.log(res.data);
      setPanelData(res.data);
  
    });          
    }
  
    const castevote = async (NAME)=>{
    
      //const { accounts, contract } = this.state;
        contract.methods.vote(NAME).send({from: accounts[0]});
      
        console.log(NAME);
        mmSet();
       
      }
      const mmSet = () => {
        setModalShow(true);
      }
      const mnSet = () => {
  
        setModalShow(false);
        navigate('/');
        //history.goBack();
        
      }
     const winner = async ()=>{
    console.log("helo")
    //const { accounts, contract } = this.state;
    

    const response = await contract.methods.totalVotes().call();
    const response2 = await contract.methods.winnerName().call();
    console.log("response",response);
    setWinnerNa(response2);
    setStorageValue(response);
  }
return (
    <Container>
        <Row className='con'>
            {panelData.map((data, k) => (
                <Col key={k} md={6} sm={8} lg={4}>
                    <center>
                    <Card border="primary" style={{ width: '20rem', height: '24rem'}}>
                        <Card.Img src={`/uploads/${data.symbol}`} width='320px' height='200px' />

                        <Card.Body>
                            <Card.Title>{data.panelName}</Card.Title>
                        </Card.Body>
                        <Button variant="outline-primary" onClick={() => castevote(data.panelName)}>Vote</Button>
                    </Card>
                    <br/>
                    </center>
                </Col>
            ))}
        </Row>
        <br></br><br></br>
        <button id="getName" onClick={winner}>Winning Name</button>
        <br></br>
        <p>{winnerNa}</p>
        <p>Total Votes : {storageValue}</p>
        <ModalVote show={modalShow} onHide={mnSet} />
    </Container>
);
            }
export default CastVote;
