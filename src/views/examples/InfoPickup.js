// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Button,
    Col,
    Input
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  
  const InfoPickup = () => {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col-12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">List Informasi Pengambilan</h3>
                    </Col>
                    <Col className="text-right d-flex align-items-center">
                      <Input placeholder="Search" />
                      <Button color="primary" className="ml-2">
                        <i className="fa fa-search" />
                      </Button>
                    </Col>
                  </Row>
                  <Button size="sm" color="danger">Belum Dikonfirmasi</Button>
                  <Button size="sm" color="success">Sudah Dikonfirmasi</Button>
                </CardHeader>
                <div className="table-wrap">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Data Berita Acara</th>
                        <th scope="col">Status Ambil</th>
                        <th scope="col">Data Pengambilan</th>
                        <th scope="col">Konfirmasi</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          1
                        </th>
                        <td>
                          <div>
                              <b>Nama Tersangka </b>
                              ALUSMAN PERANGIN-ANGIN
                          </div>
                          <div>
                              <b>Nomor Register Bukti (BA-5) Rb-12/BB/03/2022 </b>
                              ALUSMAN PERANGIN-ANGIN
                          </div>
                          <div>
                              <b>Perkara </b>
                              Pencurian
                          </div>
                          <div>
                              <b>Barang Bukti </b>
                              6 (enam) batang pipa GIP besi ukuran 6 inchi dengan panjang masing-masing 3.5 meter.
                          </div>
                          <div>
                              <b>Jaksa </b>
                              RANDA MORGAN TARIGAN SH.
                          </div>
                        </td>
                        <td>
                          <Badge color="warning">
                            Sudah Isi Form
                          </Badge>
                        </td>
                        <td>
                          <div>
                              <b>No. KTP Pengambil </b>
                              1234567890
                          </div>
                          <div>
                              <b>Nama Pengambil </b>
                              A
                          </div>
                          <div>
                              <b>Pengambilan Barang Bukti </b>
                              DI AMBIL
                          </div>
                          <div>
                              <b>Foto KTP Pengambil </b>
                              [Lihat Gambar / Dokumen]
                          </div>
                          <div>
                              <b>Foto Bukti Kepemilikan </b>
                              [Lihat Gambar / Dokumen]
                          </div>
                        </td>
                        <td>
                          Pihak Kejaksaan Belum Konfirmasi
                        </td>
                        <td>
                          <Button type="button" size="sm" color="success">
                              Konfirmasi
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default InfoPickup;
  