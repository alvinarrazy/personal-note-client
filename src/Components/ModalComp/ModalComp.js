import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Modal.css'
import './Modal-mobile.css'

export default function ModalComp(props) {
  return (
    <div className='modal-container'>
      <Modal size={props.size} scrollable show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
