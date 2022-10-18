import React from 'react'
import { Modal, ModalBody } from 'reactstrap'

const ModalPreview = ({ isOpen, toggle, data }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
            <ModalBody className="pt-1">
                <img src={data} alt="img" className='img-fluid' />
            </ModalBody>
        </Modal>
  )
}

export default ModalPreview