import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import './panelrequest.css';
import {useNavigate, useLocation} from 'react-router-dom';
import Axios from 'axios';
function Rejected(){
  const [panelData, setPanelData] = useState([]);
  
  useEffect(()=> {
    Axios.get("http://localhost:3001/getRejectedPanels").then((res)=>{
      console.log(res.data);
      setPanelData(res.data);
        });      
  }, []);
  return (
    <>
    {panelData.map((p) => (
    <Card className='reqbody'>
    <Card.Header><h3>Panel : {p.panel_id}</h3></Card.Header>
    <Card.Body>
    <Card.Text>Submitted by: {p.submittedBy}</Card.Text>
    </Card.Body>
  </Card> 
    ))}
    </>
  )
}
function Approved(){
  const [panelData, setPanelData] = useState([]);
  useEffect(()=> {
    Axios.get("http://localhost:3001/getApprovedPanels").then((res)=>{
      console.log(res.data);
      setPanelData(res.data);
        });      
  }, []);
  return (
    <>
    {panelData.map((p) => (
    <Card className='reqbody'>
    <Card.Header><h3>Panel : {p.panel_id}</h3></Card.Header>
    <Card.Body>
    <Card.Text>Submitted by: {p.submittedBy}</Card.Text>
    </Card.Body>
  </Card> 
    ))}
    </>
  )
} 
function Pending(){ 
 const navigate = useNavigate();
 const location = useLocation(); 
 const [panelData, setPanelData] = useState([]);
  useEffect(()=> {
    Axios.get("http://localhost:3001/getPendingPanels").then((res)=>{
      console.log(res.data);
      setPanelData(res.data);
        });      
  }, []);
 const handleClick=(x)=>{
  console.log(x);
  Axios.post('http://localhost:3001/sendId', {panelId: x});
  navigate('allPanelDetails', {state: {isAdmin: location.state.isAdmin}});
 }
  return (
    <>
    {panelData.map((p) => (
    <Card className='reqbody' onClick={()=>handleClick((p.submittedBy))}>
    <Card.Header><h3>Panel : {p.panel_id}</h3></Card.Header>
    <Card.Body>
    <Card.Text>Submitted by: {p.submittedBy}</Card.Text>
    </Card.Body>
  </Card> 
    ))}
     
    </>
  )
}

function PanelRequest() {
  const[appr,setAppr] = useState(false);
  const[pend,setpend] = useState(true);
  const[rej,setRej] = useState(false);
    return (
    <>
     <Card className='request'>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#pending">
          <Nav.Item>
            <Nav.Link href="#pending" onClick={()=>{setpend(true);setRej(false);setAppr(false);}}>Pending</Nav.Link>
            <Nav.Item>
              
            </Nav.Item>
           </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#approved" onClick={()=>{setAppr(true);setpend(false);setRej(false)}}>Approved</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#rejected" onClick={()=>{setRej(true);setAppr(false);setpend(false);}}>
              Rejected
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <div className='reqbody'>
        {pend &&<Pending/>}
        {appr &&<Approved/>}
        {rej &&<Rejected/>}
      </div>
     
      </Card>
    </>
  )
}

export default PanelRequest