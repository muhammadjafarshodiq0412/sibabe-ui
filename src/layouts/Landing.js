import HomeNavbar from 'components/Navbars/HomeNavbar';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Landing = () => {
  return (
    <div>
      <HomeNavbar>
        <Container className="py-3">
          <Row className="align-items-center">
            <Col md={6}>
              <img
                alt="..."
                src={require("../assets/img/brand/banner.svg").default}
                className="img-fluid"
              />
            </Col>
            <Col md={6}>
              <h1>SiBabe Lamandau</h1>
              <p>SiBabe Lamandau merupakan sistem informasi untuk mencari barang bukti elektronik pada Kejaksaan Negeri Lamandau</p>
            </Col>
          </Row>
        </Container>
      </HomeNavbar>
    </div>

  )
}

export default Landing