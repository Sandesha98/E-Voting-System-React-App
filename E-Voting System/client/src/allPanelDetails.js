import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import './panelrequest.css';
import {useNavigate, useLocation} from 'react-router-dom';
import Axios from 'axios';
import ModalFeedback from './modalFeedback';
import GiveInfo from './GiveInfo';
import RejectPanel from './RejectPanel';
function AllPanelDetails(){ 
 const navigate = useNavigate();
 const location = useLocation();
  const [allPanelData, setAllPanelData] = useState([]);
  const [modalDetails, setModalDetails] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [reject, setReject] = React.useState(false);
  const [idd,setId] = useState('');
  useEffect(()=> {
    Axios.get("http://localhost:3001/getAllPanels").then((res)=>{
      console.log(res.data);
     setAllPanelData(res.data);
        });      
  }, []);

  return (
    <>
    {allPanelData.map((p) => 
    ( 
    <Card className='reqbody'>
    <Card.Header><h3>Post : {p.postName}</h3></Card.Header>
    <Card.Body>
    <Card.Img src='vote.jpg'></Card.Img>
    <Card.Text>Name : {p.name}</Card.Text>
    <Card.Text>Father's Name : {p.fatherName}</Card.Text>
    <Card.Text>Email : {p.email}</Card.Text>
    <Card.Text>Department : {p.department}</Card.Text>
    <Card.Text>Semester : {p.semester}</Card.Text>
    <Card.Text>Cgpa : {p.cgpa}</Card.Text>
    <Card.Text>Contact Number : {p.contact_num}</Card.Text>
    </Card.Body>
  </Card> 
   
    )

    )}
    {(location.state.isAdmin) ? <div class="col-md-12 text-center">
     <Button variant="light" onClick={() => setReject(true)}>
        Reject
      </Button>&nbsp;&nbsp;
      <Button variant="light" onClick={() => setModalShow(true)}>
        Improve
      </Button>&nbsp;&nbsp;
      <Button variant="light" onClick={() => setModalDetails(true)}>
        Accept
      </Button>
      </div> : false}
    
      <ModalFeedback
        show={modalShow}
        onHide={() => setModalShow(false) } 
      />
      <GiveInfo
        show={modalDetails}

        onHide={() => setModalDetails(false) } 
      />
      <RejectPanel
        show={reject}
        onHide={() => setReject(false) } 
      />
    </>
  )
}


export default AllPanelDetails;