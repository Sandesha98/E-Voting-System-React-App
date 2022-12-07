import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import { Input } from 'antd';
import { FormLabel } from 'react-bootstrap';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function GiveInfo(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [val,setVal]= useState('');
    const navigate= useNavigate();
    const handleClick=()=>{
  // e.preventDefault();
  var formData = new FormData();
  formData.append('name',JSON.stringify(val));
  formData.append('myImage',selectedImage);
   const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
   Axios.post("http://localhost:3001/giveDetails",formData,config);
   props.onHide();
   navigate(-1);
    }
    return (
    <>
   
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Details By CDC
        </Modal.Title>
      </Modal.Header>
      <center>
      <FormLabel>Assign Name</FormLabel> &nbsp;&nbsp;&nbsp;
      <Input style={{width : '200px' }} onChange={(e)=>setVal(e.target.value)} value={val}/>
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <FormLabel>Assign Symbol </FormLabel> &nbsp;&nbsp;&nbsp;
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
      <div style={{border: '2px solid black', width: '180px', height: '120px'}}>
        {selectedImage && (
            <>
        <img alt="not fount" width={"176px"}  height={"116px"} src={URL.createObjectURL(selectedImage)} />
        </>
      )}
            
        </div>
        <br/>
       
       
      </center>
      <Modal.Footer>
      <Button onClick={handleClick}>Submit</Button>
      </Modal.Footer>
      
    </Modal>

    </>
  );
}
export default GiveInfo;