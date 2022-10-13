/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const ModalInputItem = ({ isOpen, toggle, created }) => {

    const [optionsItemType] = useState([
        {
            value: "1",
            label: "Test 1"
        },
        {
            value: "1",
            label: "Test 2"
        },
    ]);

    const [optionsLocationItemEvidance] = useState([
        {
            value: "1",
            label: "Test 1"
        },
        {
            value: "1",
            label: "Test 2"
        },
    ]);

    const submit = async (e) => {
        e.preventDefault()
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>{created ? "Input" : "Update"} Barang Bukti</ModalHeader>
            <ModalBody className="pt-1">
                <Form onSubmit={submit}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Jenis Barang Bukti</Label>
                                <Select
                                    name="jenis-barang-bukti"
                                    placeholder="Pilih Jenis Barang Bukti"
                                    options={optionsItemType}
                                // defaultValue={jenisPembelajaran}
                                // onChange={(e) => setJenisPembelajaran(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Registrasi Perkara</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Registrasi Perkara"
                                // value={mataKuliah}
                                // onChange={(e) => setMatakuliah(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor P-48</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor P-48"
                                // value={semester}
                                // onChange={(e) => setSemester(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nama Petugas BB</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Petugas BB"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nama Tersangka / Terdakwa / Terpidana</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Tersangka / Terdakwa / Terpidana"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Register Bukti (BA-5)</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Register Bukti (BA-5)"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Tanggal BA-5</Label>
                                <Input
                                    type="date"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Perkara</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Perkara"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Surat Perintah Penyitaan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Inputkan Surat Perintah Penyitaan"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Berita Acara Penyitaan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Inputkan Berita Acara Penyitaan"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Pasal Yang Didakwakan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Inputkan Pasal Yang Didakwakan"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nama Jaksa</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Jaksa"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Barang Bukti</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Barang Bukti"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Polisi</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Polisi"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Mesin</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Mesin"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Rangka</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Rangka"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nama Pemilik</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Pemilik"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Barang Bukti Lainnya</Label>
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Barang Bukti Lainnya"
                                        // value={sks}
                                        // onChange={(e) => setSks(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nomor Polisi Barang"
                                        // value={sks}
                                        // onChange={(e) => setSks(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nomor Mesin Barang"
                                        // value={sks}
                                        // onChange={(e) => setSks(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nomor Rangka Barang Bukti Lainnya"
                                        // value={sks}
                                        // onChange={(e) => setSks(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nama Pemilik Lainnya"
                                        // value={sks}
                                        // onChange={(e) => setSks(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Barang Bukti Lainnya Bukan Kendaraan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Inputkan Barang Bukti Lainnya Bukan Kendaraan"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Lokasi Barang Bukti</Label>
                                <Select
                                    name="lokasi-barang-bukti"
                                    placeholder="Pilih Lokasi Barang Bukti"
                                    options={optionsLocationItemEvidance}
                                // defaultValue={jenisPembelajaran}
                                // onChange={(e) => setJenisPembelajaran(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Status Barang Bukti</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Status Barang Bukti"
                                // value={sks}
                                // onChange={(e) => setSks(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Gambar Barang Bukti</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button color="primary" type="submit">Simpan Data</Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default ModalInputItem;
