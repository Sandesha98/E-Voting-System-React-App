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
import ModalAccept from './modalAccept';
import axios from 'axios';
function AllPanelDetails(){ 
 const navigate = useNavigate();
 const location = useLocation();
  const [allPanelData, setAllPanelData] = useState([]);
  const [modalDetails, setModalDetails] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [reject, setReject] = React.useState(false);
  const [accept, setAccept] = React.useState(false);
  const [idd,setId] = useState('');
//  const [images, setImages]=useState([]);
//  const [fallback, setFallback]=useState('');
//  const getImages = async () => {
//   try{
//   const res= await axios.get("http://localhost:3001/uploadedImages");
//   if(!res.data.files){
//     setFallback(res.data.msg);
//     return;
//   }
//   else{
//     console.log(res.data.files);
//     setImages(res.data.files);
//   }
//   }
//   catch(err){
//     console.log(err);
//   }
//  }
//  const configureImage = (image) => {
//   return ("http://localhost:3001/uploadedImages/" + image);
// }
  useEffect(()=> {
    Axios.get("http://localhost:3001/getAllPanels").then((res)=>{
      //console.log(res.data);
     setAllPanelData(res.data);
     
        });
        //getImages();
        //console.log(images);      
  }, []);
  
  const handleAccept=()=>{
    if(location.state.post=='DC')
    {
      setAccept(true);
    }
    if(location.state.post=='CDC')
    {
      setModalDetails(true);
    }
  }
  
  return (
    <>
    <div className='cc'>
  {console.log(allPanelData)}
    {allPanelData.map((p) => 
    ( 
      
    <Card className='reqbody'>
    <Card.Header><center><h2>{p.postName}</h2></center></Card.Header>
    <Card.Body>
    <Card.Img variant="top" style={{width: "150px", height: "200px",borderRadius:" 8px"}} src={`/uploads/${p.picture}`}></Card.Img>
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
       <Button variant="light" onClick={handleAccept}>
        Accept
      </Button>
      </div> :  false}
    
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
        post={location.state.post}
        onHide={() => setReject(false) } 
      />
      <ModalAccept
        show={accept}
        onHide={() => setAccept(false) } 
      />
      </div>
    </>
  )
}


export default AllPanelDetails;