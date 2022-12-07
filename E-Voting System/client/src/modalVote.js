import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalVote(props) {
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
         Vote Casted Successfully
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      
    </Modal>

    </>
  );
}
export default ModalVote;