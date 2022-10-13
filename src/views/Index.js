import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Badge,
  CardBody
} from "reactstrap";

import Header from "components/Headers/Header.js";

const Index = (props) => {

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">List Barang Bukti Terbaru</h3>
                  </div>
                </Row>
              </CardHeader>
              <div className="table-wrap">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nomor Register Bukti (BA-5)</th>
                      <th scope="col">Nama Tersangka</th>
                      <th scope="col">Perkara</th>
                      <th scope="col">Barang Bukti</th>
                      <th scope="col">Status Ambil</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">06/BB/03/2022</th>
                      <td>PERDAMENTA GINTING dan BOY GINTING</td>
                      <td>Pencurian</td>
                      <td>6 (enam) batang pipa GIP besi ukuran 6 inchi dengan panjang masing-masing 3.5 meter.</td>
                      <td>
                        <Badge color="warning">Sudah Isi Form</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">06/BB/03/2022</th>
                      <td>PERDAMENTA GINTING dan BOY GINTING</td>
                      <td>Pencurian</td>
                      <td>6 (enam) batang pipa GIP besi ukuran 6 inchi dengan panjang masing-masing 3.5 meter.</td>
                      <td>
                        <Badge color="warning">Sudah Isi Form</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">06/BB/03/2022</th>
                      <td>PERDAMENTA GINTING dan BOY GINTING</td>
                      <td>Pencurian</td>
                      <td>6 (enam) batang pipa GIP besi ukuran 6 inchi dengan panjang masing-masing 3.5 meter.</td>
                      <td>
                        <Badge color="warning">Sudah Isi Form</Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">6 Notifikasi Pengambilan Terbaru</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="py-1">
                <h6 className="mb-3">
                  <Badge color="success" className="mr-2">
                      <i className="ni ni-notification-70" /> 
                  </Badge>
                  Nomor Register Bukti (BA-5) <b>06/BB/03/2022</b> Telah Diisi Form Pengambilan / Klaim
                </h6>
                <h6 className="mb-3">
                  <Badge color="success" className="mr-2">
                      <i className="ni ni-notification-70" /> 
                  </Badge>
                  Nomor Register Bukti (BA-5) <b>06/BB/03/2022</b> Telah Diisi Form Pengambilan / Klaim
                </h6>
                <h6 className="mb-3">
                  <Badge color="success" className="mr-2">
                      <i className="ni ni-notification-70" /> 
                  </Badge>
                  Nomor Register Bukti (BA-5) <b>06/BB/03/2022</b> Telah Diisi Form Pengambilan / Klaim
                </h6>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
