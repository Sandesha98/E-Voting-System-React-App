import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Input } from 'antd';
import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ModalFeedback(props) {
    const { TextArea } = Input;
    const [val, setVal] = useState('');
    const navigate = useNavigate();
    const handleClick=()=>{
      Axios.post("http://localhost:3001/submitFeedback", {feedback: val})
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
        Give Feedback
        </Modal.Title>
        
        
      </Modal.Header>
      <Modal.Body>
      <TextArea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Enter your feedback"
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
      </Modal.Body>
      
      <Modal.Footer>
      <Button onClick={handleClick}>Submit</Button>
      </Modal.Footer>
      
    </Modal>

    </>
  );
}
export default ModalFeedback;