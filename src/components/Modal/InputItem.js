/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap';
import { updateItemEvidance } from 'services/itemEvidances';
import { setItemEvidance } from 'services/itemEvidances';
import { setSaveTransaction } from 'services/transactions';
import Swal from 'sweetalert2';

const ModalInputItem = ({ isOpen, toggle, created, payload, listCategory, getData, detail, user }) => {

    const [data, setData] = useState({
        noRegPerkara: "", //Nomor Registrasi Perkara
        noP48: "", //Nomor P-48
        namaPetugasBB: "", //Nama Petugas BB
        namaTersangka: "", //Nama Tersangka / Terdakwa / Terpidana
        noRegBukti: "", //Nomor Register Bukti (BA-5)
        tglBa5: "", //Tanggal BA-5
        perkara: "", //Perkara
        suratPerintahPenyitaan: "", //Surat Perintah Penyitaan
        beritaAcaraPenyitaan: "", //Berita Acara Penyitaan
        pasalDakwaan: "", //Pasal Yang Didakwakan
        namaJaksa: "", //Nama Jaksa
        namaPemilik1: "", // Nama Pemilik
        barangBukti1: "", //Barang Bukti
        noPol1: "", //Nomor Polisi
        noMesin1: "", //Nomor Mesin
        noRangka1: "", //Nomor Rangka
        namaPemilik2: "", //Barang Bukti Lainnya
        barangBukti2: "", //Barang Bukti Lainnya
        noPol2: "", //Barang Bukti Lainnya
        noMesin2: "", //Barang Bukti Lainnya
        noRangka2: "", //Barang Bukti Lainnya
        barangBuktiBk: "", //Barang Bukti Lainnya Bukan Kendaraan
        lokasiBb: "", //Lokasi Barang Bukti
        ketBb: "", //Status Barang Bukti
        noPutusan: "", //Nomor Putusan
        kategoriBb: "" //Jenis Barang Bukti
    });
    const [dataClaim, setDataClaim] = useState({
        admin: 1,
        claimer: "",
        barangBukti: "",
        namaPengambil: "",
        nikPengambil: "",
        picKtpPengambil: "",
        picKepemilikan: "",
        pengambilanBb: ""
    });
    const [file, setFile] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nameUser, setNameUser] = useState({
        name: '',
        phoneNumber: ''
    });

    const ROOT_API = process.env.REACT_APP_API_URL
    const history = useHistory();

    useEffect(() => {
        setFile([]);
        if (user) {
            const profileCookies = Cookies.get('_P01e')
            const profileDecode = profileCookies && JSON.parse(atob(profileCookies))
            setDataClaim({ ...dataClaim, barangBukti: payload?.id, claimer: profileDecode?.id, admin: payload?.user?.id })
        }
        if (!created && payload) {
            let response = payload
            setNameUser({
                name: payload?.user?.name,
                phoneNumber: payload?.user?.phoneNumber
            })
            delete response.user
            if (payload.kategoriBb && !user) {
                const valueCategory = listCategory.filter(val => val.value === payload.kategoriBb.id)[0]
                setData({ ...response, kategoriBb: valueCategory })
            } else {
                delete response.kategoriBb
                setData(response)
            }
        } else {
            setData({
                noRegPerkara: "",
                noP48: "",
                namaPetugasBB: "",
                namaTersangka: "",
                noRegBukti: "",
                tglBa5: "",
                perkara: "",
                suratPerintahPenyitaan: "",
                beritaAcaraPenyitaan: "",
                pasalDakwaan: "",
                namaJaksa: "",
                namaPemilik1: "",
                barangBukti1: "",
                noPol1: "",
                noMesin1: "",
                noRangka1: "",
                namaPemilik2: "",
                barangBukti2: "",
                noPol2: "",
                noMesin2: "",
                noRangka2: "",
                barangBuktiBk: "",
                lokasiBb: "",
                ketBb: "",
                noPutusan: "",
                kategoriBb: ""
            })
        }
    }, [isOpen]);

    const submit = async (e) => {
        e.preventDefault()

        if (user) {
            const profileCookies = Cookies.get('_P01e')
            if (profileCookies) {
                let errorValidasiClaim = false

                Object.keys(dataClaim).some(keys => {
                    if (dataClaim[keys] === '') {
                        errorValidasiClaim = true
                    }
                    return dataClaim[keys] === '' || dataClaim[keys] === null
                })

                if (errorValidasiClaim) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Form harus diisi semua!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    setLoading(true)
                    const formData = new FormData();
                    const payloadData = {
                        admin: dataClaim.admin,
                        claimer: dataClaim.claimer,
                        barangBukti: dataClaim.barangBukti,
                        namaPengambil: dataClaim.namaPengambil,
                        nikPengambil: dataClaim.nikPengambil,
                        pengambilanBb: dataClaim?.pengambilanBb?.value
                    }

                    formData.append('data', JSON.stringify(payloadData))

                    if (dataClaim.picKepemilikan) {
                        formData.append('kepemilikan', dataClaim.picKepemilikan)
                    }

                    if (dataClaim.picKtpPengambil) {
                        formData.append('ktp', dataClaim.picKtpPengambil)
                    }

                    const response = await setSaveTransaction(formData)

                    if (response.error) {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        setLoading(false)
                        toggle()
                        getData()
                        Swal.fire({
                            icon: 'success',
                            title: "Data Berhasil Diklaim",
                            confirmButtonText: 'Konfirmasi Melalui Whatsapp',
                            cancelButtonText: 'Tidak'
                        }).then((value) => {
                            if (value.isConfirmed) {
                                const profileCookies = Cookies.get('_P01e')
                                const profileDecode = profileCookies && JSON.parse(atob(profileCookies))
                                window.open(
                                    `https://api.whatsapp.com/send?phone=62${nameUser?.phoneNumber ? nameUser?.phoneNumber[0] === '0' ? nameUser?.phoneNumber?.replace('0', '') : nameUser?.phoneNumber : ''}&text=Halo%20${nameUser?.name}%20.%20Saya,%20${profileDecode?.name},%20Dengan%20Nomor%20KTP:%20${dataClaim.nikPengambil}.%20Ingin%20Mengambil%20Barang%20Bukti%20Saya.%20Adapun%20Nomor%20Register%20Bukti%20(BA5):%20${payload?.noRegBukti},%20Dengan%20Barang%20Bukti:%20${payload?.barangBukti1}%20dengan%20nomor%20polisi%20${payload?.noPol1}%20.%20Mohon%20Untuk%20Segera%20Ditindak%20Lanjuti%20Permohonan%20Saya.`
                                )
                            }
                        })
                    }
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Silahkan Login Terlebih Dahulu untuk Klaim',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    history.push('/auth/login')
                })
            }
        } else {
            let errorValidasi = false

            Object.keys(data).some(keys => {
                if (keys.includes('pic') === false) {
                    if (data[keys] === '') {
                        errorValidasi = true
                    }
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
                const profileCookies = Cookies.get('_P01e')
                const profileDecode = JSON.parse(atob(profileCookies))
                let json
                const formData = new FormData();
                if (file.length > 0) {

                    // let fileData = {
                    //     pic1: "",
                    //     pic2: "",
                    //     pic3: "",
                    //     pic4: "",
                    //     pic5: "",
                    //     pic6: "",
                    //     pic7: "",
                    //     pic8: "",
                    //     pic9: "",
                    //     pic10: "",
                    // }

                    // await Promise.all(Object.keys(data).map((keys) => {
                    //     if (keys.includes('pic')) {
                    //         fileData = { ...fileData, [keys]: data[keys] }
                    //     }
                    //     return true
                    // }))

                    let payloadData = data

                    delete payloadData.filePath
                    delete payloadData.fileSize
                    delete payloadData.fileName
                    delete payloadData.fileExtension
                    delete payloadData.id
                    delete payloadData.createdDate
                    delete payloadData.statusNoReg

                    json = {
                        ...payloadData,
                        kategoriBb: data?.kategoriBb ? data?.kategoriBb?.value : '',
                        user: profileDecode?.id
                    }


                    formData.append('barangBukti', JSON.stringify(json))

                    await Promise.all(file.map((value, index) => {
                        formData.append('files', value)
                        return true
                    }))
                } else {
                    let payloadData = data

                    delete payloadData.filePath
                    delete payloadData.fileSize
                    delete payloadData.fileName
                    delete payloadData.fileExtension
                    delete payloadData.id
                    delete payloadData.createdDate
                    delete payloadData.statusNoReg

                    json = {
                        ...payloadData,
                        kategoriBb: data?.kategoriBb ? data?.kategoriBb?.value : '',
                        user: profileDecode?.id
                    }

                    formData.append('barangBukti', JSON.stringify(json))
                }

                let response

                if (created) {
                    response = await setItemEvidance(formData)
                } else {
                    response = await updateItemEvidance(formData, payload.id)
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

    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>{detail ? "Detail" : created ? "Input" : "Update"} Barang Bukti</ModalHeader>
            <ModalBody className="pt-1">
                <Form onSubmit={submit}>
                    <Row>
                        {user ? (
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Nomor Registrasi Perkara</Label>
                                    <Input
                                        type="text"
                                        placeholder="Inputkan Nomor Registrasi Perkara"
                                        value={payload?.kategoriBb?.value}
                                        disabled={detail}
                                    />
                                </FormGroup>
                            </Col>
                        ) : (
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Jenis Barang Bukti</Label>
                                    <Select
                                        name="jenis-barang-bukti"
                                        placeholder="Pilih Jenis Barang Bukti"
                                        options={listCategory}
                                        value={data?.kategoriBb}
                                        onChange={(e) => setData({ ...data, kategoriBb: e })}
                                        isDisabled={detail}
                                    />
                                </FormGroup>
                            </Col>
                        )}
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Registrasi Perkara</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Registrasi Perkara"
                                    value={data?.noRegPerkara}
                                    onChange={(e) => setData({ ...data, noRegPerkara: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor P-48</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor P-48"
                                    value={data?.noP48}
                                    onChange={(e) => setData({ ...data, noP48: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nama Petugas BB</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Petugas BB"
                                    value={data?.namaPetugasBB}
                                    onChange={(e) => setData({ ...data, namaPetugasBB: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nama Tersangka / Terdakwa / Terpidana</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Tersangka / Terdakwa / Terpidana"
                                    value={data?.namaTersangka}
                                    onChange={(e) => setData({ ...data, namaTersangka: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Register Bukti (BA-5)</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Register Bukti (BA-5)"
                                    value={data?.noRegBukti}
                                    onChange={(e) => setData({ ...data, noRegBukti: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Tanggal BA-5</Label>
                                <Input
                                    type="date"
                                    value={data?.tglBa5}
                                    onChange={(e) => setData({ ...data, tglBa5: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Perkara</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Perkara"
                                    value={data?.perkara}
                                    onChange={(e) => setData({ ...data, perkara: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Surat Perintah Penyitaan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Inputkan Surat Perintah Penyitaan"
                                    value={data?.suratPerintahPenyitaan}
                                    onChange={(e) => setData({ ...data, suratPerintahPenyitaan: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Berita Acara Penyitaan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Inputkan Berita Acara Penyitaan"
                                    value={data?.beritaAcaraPenyitaan}
                                    onChange={(e) => setData({ ...data, beritaAcaraPenyitaan: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Pasal Yang Didakwakan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Inputkan Pasal Yang Didakwakan"
                                    value={data?.pasalDakwaan}
                                    onChange={(e) => setData({ ...data, pasalDakwaan: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nama Jaksa</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Jaksa"
                                    value={data?.namaJaksa}
                                    onChange={(e) => setData({ ...data, namaJaksa: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Barang Bukti</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Barang Bukti"
                                    value={data?.barangBukti1}
                                    onChange={(e) => setData({ ...data, barangBukti1: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Polisi</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Polisi"
                                    value={data?.noPol1}
                                    onChange={(e) => setData({ ...data, noPol1: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Mesin</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Mesin"
                                    value={data?.noMesin1}
                                    onChange={(e) => setData({ ...data, noMesin1: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nomor Rangka</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nomor Rangka"
                                    value={data?.noRangka1}
                                    onChange={(e) => setData({ ...data, noRangka1: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nama Pemilik</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Nama Pemilik"
                                    value={data?.namaPemilik1}
                                    onChange={(e) => setData({ ...data, namaPemilik1: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Barang Bukti Lainnya</Label>
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Barang Bukti Lainnya"
                                            value={data?.barangBukti2}
                                            onChange={(e) => setData({ ...data, barangBukti2: e.target.value })}
                                            disabled={detail}
                                        />
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nomor Polisi Barang"
                                            value={data?.noPol2}
                                            onChange={(e) => setData({ ...data, noPol2: e.target.value })}
                                            disabled={detail}
                                        />
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nomor Mesin Barang"
                                            value={data?.noMesin2}
                                            onChange={(e) => setData({ ...data, noMesin2: e.target.value })}
                                            disabled={detail}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nomor Rangka Barang Bukti Lainnya"
                                            value={data?.noRangka2}
                                            onChange={(e) => setData({ ...data, noRangka2: e.target.value })}
                                            disabled={detail}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nama Pemilik Lainnya"
                                            value={data?.namaPemilik2}
                                            onChange={(e) => setData({ ...data, namaPemilik2: e.target.value })}
                                            disabled={detail}
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
                                    value={data?.barangBuktiBk}
                                    onChange={(e) => setData({ ...data, barangBuktiBk: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Lokasi Barang Bukti</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Lokasi Barang Bukti"
                                    value={data?.lokasiBb}
                                    onChange={(e) => setData({ ...data, lokasiBb: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Status Barang Bukti</Label>
                                <Input
                                    type="text"
                                    placeholder="Inputkan Status Barang Bukti"
                                    value={data?.ketBb}
                                    onChange={(e) => setData({ ...data, ketBb: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Nomor Putusan</Label>
                                <Input
                                    type="textarea"
                                    placeholder="Inputkan Nomor Putusan"
                                    value={data?.noPutusan}
                                    onChange={(e) => setData({ ...data, noPutusan: e.target.value })}
                                    disabled={detail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Gambar Barang Bukti</Label>
                                {!detail && (
                                    <Row>
                                        {[...Array(10)].map((value, index) => {
                                            return (
                                                <Col md={4} className="mb-2" key={String(index)}>
                                                    <Input type="file" onChange={(e) => setFile([...file, e.target.files[0]])} />
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                )}
                                {detail ? (
                                    <Row>
                                        {[...Array(data?.fileSize)].map((value, idx) => {
                                            return (
                                                <Col md={4} key={String(idx)}>
                                                    <div className='img-preview'>
                                                        <img src={`${ROOT_API}${data?.filePath}${data?.fileName}${idx + 1}_${data?.id}${data?.fileExtension}`} alt={`img-${idx}`} className='img-fluid' />
                                                    </div>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                ) : null}
                            </FormGroup>
                        </Col>
                        {(user && payload?.statusNoReg !== 'CLOSE') && (
                            <>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Nama Pengambil</Label>
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nama Pengambil"
                                            onChange={(e) => setDataClaim({ ...dataClaim, namaPengambil: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>No. KTP Pengambil</Label>
                                        <Input
                                            type="text"
                                            placeholder="Inputkan Nama Pengambil"
                                            onChange={(e) => setDataClaim({ ...dataClaim, nikPengambil: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <FormGroup>
                                </FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Pengambilan Barang Bukti</Label>
                                        <Select
                                            name="pengambilan-barang-bukti"
                                            placeholder="Pilih Pengambilan Barang Bukti"
                                            options={[
                                                {
                                                    label: 'Diambil',
                                                    value: 'Diambil'
                                                },
                                                {
                                                    label: 'Diantar',
                                                    value: 'Diantar'
                                                }
                                            ]}
                                            onChange={(e) => setDataClaim({ ...dataClaim, pengambilanBb: e })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Foto KTP (Tipe Gambar: Jpg/Jpeg/Png)</Label>
                                        <Input
                                            type="file"
                                            onChange={(e) => {
                                                setDataClaim({ ...dataClaim, picKtpPengambil: e.target.files[0] })
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Foto Kepemilikan (Tipe Gambar: Jpg/Jpeg/Png)</Label>
                                        <Input
                                            type="file"
                                            onChange={(e) => {
                                                setDataClaim({ ...dataClaim, picKepemilikan: e.target.files[0] })
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </>
                        )}
                    </Row>
                    {loading ? (
                        <Spinner size="lg" color="dark" />
                    ) : (
                        user ? (
                            <Button color="primary" type="submit" disabled={payload?.statusNoReg === 'CLOSE'}>{payload?.statusNoReg === 'CLOSE' ? 'Sudah di Ambil / Klaim' : 'Ambil / Klaim'}</Button>
                        ) : (
                            <Button color="primary" type="submit" hidden={detail}>Simpan Data</Button>
                        )
                    )}
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default ModalInputItem;
