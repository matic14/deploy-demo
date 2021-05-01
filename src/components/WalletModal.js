import { Modal, Button } from 'react-bootstrap'
import Web3Modal from './Web3Modal'

function WalletModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Connect Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Web3Modal />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WalletModal
