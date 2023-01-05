import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ModalAccept(props) {
    const navigate= useNavigate();
    const handleClick=()=>{
        // e.preventDefault();
         Axios.post("http://localhost:3001/AcceptedByDC");
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
         Accepted by Discipline Committee
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Footer>
      <Button onClick={handleClick}>OK</Button>
      </Modal.Footer>
      
    </Modal>

    </>
  );
}
export default ModalAccept;