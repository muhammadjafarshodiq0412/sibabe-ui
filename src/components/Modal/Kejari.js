/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap';
import { updateUser } from 'services/users';
import { setUser } from 'services/users';
import Swal from 'sweetalert2';

const ModalKejari = ({ isOpen, toggle, created, payload, getData }) => {

    const [data, setData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        username: "",
        password: "",
        role: "ADMIN",
        isActive: true,
        nik: "no need"
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!created && payload) {
            const response = {
                ...payload,
                password: '',
                nik:'no need'
            }

            setData(response)
        } else {
            setData({
                name: "",
                phoneNumber: "",
                email: "",
                username: "",
                password: "",
                role: "ADMIN",
                isActive: true
            })
        }
    }, [isOpen]);

    const submit = async (e) => {
        e.preventDefault()
        let errorValidasi = false

        Object.keys(data).some(keys => {
            if (data[keys] === '') {
                console.log(data.valueOf())
                errorValidasi = true
            }
            return data[keys] === '' || data[keys] === null
        })

        if (errorValidasi) {
            Swal.fire({
                icon: 'error',
                title: 'Form harus diisi semua!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            setLoading(true);

            let response

            if (created) {
                response = await setUser(data)
            } else {
                response = await updateUser(data, payload.id)
            }

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
                    title: created ? "Data Berhasil Diinputkan" : "Data Berhasil Diupdate",
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
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Nomor Whatsapp</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Whatsapp"
                                    value={data.phoneNumber}
                                    onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Email Aktif</Label>
                                <Input
                                    type="email"
                                    placeholder="Inputkan Email Aktif"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Username"
                                    value={data.username}
                                    onChange={(e) => setData({ ...data, username: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Inputkan Password"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {loading ? (
                        <Spinner size="lg" color="dark" />
                    ) : (
                        <Button color="primary" type="submit">Simpan Data</Button>
                    )}
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default ModalKejari;
