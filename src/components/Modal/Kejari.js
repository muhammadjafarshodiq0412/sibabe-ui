/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const ModalKejari = ({ isOpen, toggle, created }) => {

    const submit = async (e) => {
        e.preventDefault()
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>{created ? "Input" : "Update"} Kejari</ModalHeader>
            <ModalBody className="pt-1">
                <Form onSubmit={submit}>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Nama Kejari</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Kejari"
                                // value={mataKuliah}
                                // onChange={(e) => setMatakuliah(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Nomor Whatsapp</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Whatsapp"
                                // value={semester}
                                // onChange={(e) => setSemester(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Email Aktif</Label>
                                <Input
                                    type="email"
                                    placeholder="Inputkan Email Aktif"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Username"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Inputkan Password"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button color="primary" type="submit">Simpan Data</Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default ModalKejari;
