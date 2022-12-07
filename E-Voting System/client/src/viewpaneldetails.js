import './loginscreen.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState } from "react";
import './paginationn.css';
import Paginationn from './pagination';
import { useLocation } from 'react-router-dom';
import ModalFeedback from './modalFeedback';
import GiveInfo from './GiveInfo';
function ViewPanelDetails(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const posts = ["President","Vice President","General Secretary","P.R.O","Treasure","Seconder","Proposer"];
    const [modalShow, setModalShow] = React.useState(false);
    const [count,setCount]=useState(0);
    const[dis,setDis] = useState(true)
    const [modalDetails, setModalDetails] = React.useState(false);
const location = useLocation();
function Next(){
  if(count>=6)
  {
    setDis(false)
    setCount(0)
  }
  else{
  setCount(count => count+1)
  
  }
}
function Prev(){
  if(count<=0)
  {
    setCount(6)
  }
  else{
    setCount(count=>count-1)
  }
}

  return (
    <>
    
    <Paginationn className="pagee" ac={count}/>
    
    <div className="reg-page" >
        
    <Form>
        <br/>
    <h1 className='hed'>View Panel Detail</h1>
<br/>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <br/><br/><br/><h3>{posts[count]}'s Detail Form</h3>
        </Form.Group>
        <Form.Group as={Col}>
        <div style={{border: '2px solid black', width: '180px', height: '120px'}}>
       
            <>
        <img alt="not found" width={"176px"}  height={"116px"} src={location.state.image} />
        </>
     
            
        </div>
        <br/>
       

      
        </Form.Group>
   
        
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" value={location.state.title} disabled/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>F/Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your F/name" value={location.state.fname} disabled/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        

        <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>CMS-ID</Form.Label>
        <Form.Control placeholder="xxx-xx-xxxx" value={location.state.id} disabled/>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridAddress2">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="abc@iba-suk.edu.pk" value={location.state.email} disabled/>
      </Form.Group>
      </Row>

     

     

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>CGPA</Form.Label>
          <Form.Control value={location.state.gpa} disabled/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Department</Form.Label>
          <Form.Select defaultValue="Computer Science">
            <option>Computer Science Department</option>
            <option>Electrical Department</option>
            <option>Education Department</option>
            <option>Business Department</option>
            <option>Mathematics Department</option>
            <option>Media Science Department</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control value="0003022032" disabled/>
        </Form.Group>
      </Row>

     
      <br/>
      
       {/* <div style={{display:"flex",justifyContent:"space-evenly"}}> */}
      
      {count>5?<> <Button variant="primary" onClick={Prev}>
        Back
      </Button> &nbsp;&nbsp;
      <Button variant="primary" >
        Reject
      </Button>&nbsp;&nbsp;
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Improve
      </Button>&nbsp;&nbsp;
      <Button variant="primary" onClick={() => setModalDetails(true)}>
        Accept
      </Button><br/><br/></>:<><Button variant="primary" onClick={Prev}>
        Back
      </Button> &nbsp;&nbsp;
      <Button variant="primary" onClick={Next}>
        Next
      </Button>
      <br/><br/></>}
      {/* </div> */}
      
      <br/>
    </Form>
    <ModalFeedback
        show={modalShow}
        onHide={() => setModalShow(false) } 
        // title={playerData.title}
        // description = {playerData.description}
      />
      <GiveInfo
        show={modalDetails}
        onHide={() => setModalDetails(false) } 
        // title={playerData.title}
        // description = {playerData.description}
      />
    </div>
    <br/><br/>
    </>
  );
}

export default ViewPanelDetails;