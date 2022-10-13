import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row, UncontrolledCollapse } from 'reactstrap';

const Landing = (args) => {
  return (
    <div>
      <Navbar className="navbar-top navbar-horizontal navbar-light bg-danger" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <div className="logo-navbar">
                <img
                alt="..."
                src={
                    require("../assets/img/brand/logo.png")
                }
                />
            </div>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={
                        require("../assets/img/brand/logo.png")
                      }
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto align-items-center" navbar>
              <NavItem>
                <NavLink className="nav-link-icon text-white" to="/" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Beranda</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon text-white" to="/" tag={Link}>
                  <i className="ni ni-app" />
                  <span className="nav-link-inner--text">Cari Barang Bukti</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/auth/login" tag={Link}>
                  <Button>Login</Button>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
      <div className="d-lg-none d-md-none d-sm-block">
        <Navbar expand="md" fixed="bottom" className="bg-danger">
          <NavLink href="/" className="d-flex flex-column align-items-center text-white">
            <i className="ni ni-app" />
            <p className="m-0 mt-1">Cari</p>
          </NavLink>
          <NavLink href="/" className="d-flex flex-column align-items-center text-white">
            <i className="ni ni-planet" />
            <p className="m-0 mt-1">Beranda</p>
          </NavLink>
          <NavLink href="/" className="d-flex flex-column align-items-center text-white">
            <i className="ni ni-button-power" />
            <p className="m-0 mt-1">Keluar</p>
          </NavLink>
        </Navbar>
      </div>
    </div>

  )
}

export default Landing