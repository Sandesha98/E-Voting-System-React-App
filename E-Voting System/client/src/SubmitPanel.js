import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';

function SubmitPanel(props) {
    const navigate = useNavigate();
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
         Panel is registered Successfully
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Footer>
     {/* <Link to='/homepage' onClick= {props.on}> E-Voting System</Link> */}
      <Button onClick={props.onHide}>Ok</Button>
      </Modal.Footer>
      
    </Modal>

    </>
  );
}
export default SubmitPanel;