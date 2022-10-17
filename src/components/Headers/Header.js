// reactstrap components
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { getItemEvidanceSummary } from "services/itemEvidances";
import Swal from "sweetalert2";

const Header = () => {

  const [data, setData] = useState({
    barangBukti: 0,
    belumDiambil: 0,
    sudahIsiForm: 0,
    sudahDiAmbil: 0,
  });

  const getSummary = async () => {
    const response = await getItemEvidanceSummary()
    if (response.error) {
      Swal.fire({
        icon: 'error',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setData(response.payload)
    }
  }

  useEffect(() => {
    if (window.location.pathname === '/admin/index') {
      getSummary()
    }
  }, [])

  return (
    <>
      <div className="header bg-gradient-danger pb-8 pt-5 pt-md-8">
        {window.location.pathname === '/admin/index' && (
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Jumlah Barang Bukti
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {data?.barangBukti}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Belum Diambil
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{data?.belumDiambil}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fa fa-box" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Sudah Isi Form
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{data?.sudahIsiForm}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fa fa-file"></i>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Sudah Di Ambil
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{data?.sudahDiAmbil}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fa fa-check" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        )}
      </div>
    </>
  );
};

export default Header;
