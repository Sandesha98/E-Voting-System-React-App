import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import './panelrequest.css';
import {useNavigate, useLocation} from 'react-router-dom';
import Axios from 'axios';
import Footerr from './footerr';
function Rejected(){
  const [panelData, setPanelData] = useState([]);
  const location = useLocation();  
  useEffect(()=> {
    if(location.state.post=='DC')
    {
      Axios.get("http://localhost:3001/getDCRejectedPanels").then((res)=>{
        console.log(res.data);
        setPanelData(res.data);
          });
    }
    if(location.state.post=='CDC')
    {
      Axios.get("http://localhost:3001/getCDCRejectedPanels").then((res)=>{
        console.log(res.data);
        setPanelData(res.data);
          });
    }
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
  const location = useLocation(); 
  useEffect(()=> {
    if(location.state.post=='DC')
    {
      Axios.get("http://localhost:3001/getDCApprovedPanels").then((res)=>{
      console.log(res.data);
      setPanelData(res.data);
        });   
    }
    if(location.state.post=='CDC')
    {
      Axios.get("http://localhost:3001/getCDCApprovedPanels").then((res)=>{
      console.log(res.data);
      setPanelData(res.data);
        });   
    }     
  }, []);
  return (
    <>
    {panelData.map((p) => (
      <center>
    <Card className='reqbody'>
    <Card.Header><h3>Panel : {p.panel_id}</h3></Card.Header>
    <Card.Body>
      {location.state.post=='CDC'? <> <Card.Text>Panel Name: {p.panelName}</Card.Text>
    <img src={`/uploads/${p.symbol}`} width='100px' height='100px' alt='panel symbol' />
    <br/><br/></>: false}
   
    <Card.Text>Submitted by: {p.submittedBy}</Card.Text>
    </Card.Body>
  </Card> 
  </center>
    ))}
    </>
  )
} 
function Pending(){ 
 const navigate = useNavigate();
 const location = useLocation(); 
 const [panelData, setPanelData] = useState([]);
  useEffect(()=> {
    if(location.state.post=='DC')
    {
      Axios.get("http://localhost:3001/getPendingPanels").then((res)=>{
      console.log(res.data);
      setPanelData(res.data);
        });
    }
    if(location.state.post=='CDC')
    {
      Axios.get("http://localhost:3001/getDCApprovedPanels").then((res)=>{
      console.log(res.data);
      setPanelData(res.data);
        });
    }
    
          
  }, []);
 const handleClick=(x)=>{
  console.log(x);
  Axios.post('http://localhost:3001/sendId', {panelId: x});
  navigate('allPanelDetails', {state: {isAdmin: location.state.isAdmin, post: location.state.post}});
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
            <Nav.Link className='link-hover' onClick={()=>{setpend(true);setRej(false);setAppr(false);}}>Pending</Nav.Link>
            <Nav.Item>
              
            </Nav.Item>
           </Nav.Item>
          <Nav.Item>
            <Nav.Link  onClick={()=>{setAppr(true);setpend(false);setRej(false)}}>Approved</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link  onClick={()=>{setRej(true);setAppr(false);setpend(false);}}>
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