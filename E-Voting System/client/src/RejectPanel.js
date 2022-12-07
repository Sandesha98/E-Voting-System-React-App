import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
function RejectPanel(props) {
    const navigate= useNavigate();
    const handleClick = ()=>{
      Axios.post("http://localhost:3001/reject")
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
         Panel is rejected because it does not meet right criteria!
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Footer>
       <Button onClick={handleClick}>Ok</Button>
      </Modal.Footer>
      
    </Modal>

    </>
  );
}
export default RejectPanel;