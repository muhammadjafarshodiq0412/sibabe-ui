import HomeNavbar from 'components/Navbars/HomeNavbar'
import React from 'react'
import { Button, Card, CardHeader, Container, FormGroup, Input, Label, Row, Table } from 'reactstrap'

const ItemEvidance = () => {
    return (
        <div>
            <HomeNavbar>
                <Container className="py-3">
                    <FormGroup>
                        <Label>Cari Barang Bukti</Label>
                        <div className="d-flex align-items-center">
                            <Input placeholder="Inputkan nomor register bukti/nomor tersangka/barang bukti/nomor polisi/nomor rangka/nomor mesin" />
                            <Button className="ml-3"><i className="fa fa-search" /></Button>
                        </div>
                    </FormGroup>
                    <Card className="shadow">
              <div className="table-wrap">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nomor Register Bukti (BA-5)</th>
                      <th scope="col">Nama Tersangka</th>
                      <th scope="col">Perkara</th>
                      <th scope="col">Barang Bukti</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">06/BB/03/2022</th>
                      <td>PERDAMENTA GINTING dan BOY GINTING</td>
                      <td>Pencurian</td>
                      <td>6 (enam) batang pipa GIP besi ukuran 6 inchi dengan panjang masing-masing 3.5 meter.</td>
                      <td>
                        <Button size="sm">Ambil / Klaim</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
                </Container>
            </HomeNavbar>
        </div>
    )
}

export default ItemEvidance