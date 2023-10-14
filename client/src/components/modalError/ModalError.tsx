import { Modal, Button } from "react-bootstrap";


type propsToastError = {
  modalOpen: boolean;
  closeModal: () => void;
  toastMessage: string
}


const ModalError = ({ modalOpen, closeModal, toastMessage }: propsToastError) => {
  return (
    <>
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{toastMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalError;