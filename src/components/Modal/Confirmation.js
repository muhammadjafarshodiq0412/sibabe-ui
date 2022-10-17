/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap';
import Swal from 'sweetalert2';

import Select from 'react-select';
import { setTransaction } from 'services/transactions';

const ModalConfirmation = ({ isOpen, toggle, id, getData }) => {
    const [confirmation, setConfirmation] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setConfirmation('')
        setReason('')
    }, [isOpen])

    const submit = async (e) => {
        e.preventDefault()

        if (!confirmation || !reason) {
            Swal.fire({
                icon: 'error',
                title: 'Form harus diisi semua!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            setLoading(true);

            const response = setTransaction({ transactionId: id, reason }, confirmation?.value)

            if (response.error) {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: "Data Berhasil Dikonfirmasi",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setLoading(false)
                    toggle()
                    getData()
                })
            }
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>Konfirmasi Pengambilan</ModalHeader>
            <ModalBody className="pt-1">
                <Form onSubmit={submit}>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Pilih Konfirmasi</Label>
                                <Select
                                    name="konfirmasi"
                                    placeholder="Pilih Konfirmasi"
                                    options={[
                                        {
                                            label: "Approve",
                                            value: "approve"
                                        },
                                        {
                                            label: "Reject",
                                            value: "reject"
                                        }
                                    ]}
                                    onChange={(e) => setConfirmation(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Alasan Konfirmasi</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Alasan Konfirmasi"
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {loading ? (
                        <Spinner size="lg" color="dark" />
                    ) : (
                        <Button color="primary" type="submit">Konfirmasi</Button>
                    )}
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default ModalConfirmation;
