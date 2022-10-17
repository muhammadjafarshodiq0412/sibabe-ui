import Cookies from 'js-cookie';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Media, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row, UncontrolledCollapse, UncontrolledDropdown } from 'reactstrap';

const HomeNavbar = ({ children }) => {

  const profileCookies = Cookies.get('_P01e')
  const profileDecode = profileCookies ? JSON.parse(atob(profileCookies)) : null

  const history = useHistory()

  return (
    <div>
      <Navbar className="navbar-top navbar-horizontal navbar-light bg-danger" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <div className="logo-navbar">
              <img
                alt="..."
                src={
                  require("../../assets/img/brand/logo.jpeg")
                }
                className="rounded"
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
                        require("../../assets/img/brand/logo.jpeg")
                      }
                      className="rounded"
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
                <NavLink className="nav-link-icon text-white" to="/barang-bukti" tag={Link}>
                  <i className="ni ni-app" />
                  <span className="nav-link-inner--text">Cari Barang Bukti</span>
                </NavLink>
              </NavItem>
              {profileDecode ? (
                <UncontrolledDropdown nav className='d-none d-sm-block'>
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <i className="ni ni-single-02 mr-0" />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold text-white">
                          {profileDecode?.name}
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => {
                      Cookies.remove('_T0123')
                      Cookies.remove('_P01e')
                      history.push('/')
                    }}>
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavItem>
                  <NavLink to="/auth/login" tag={Link}>
                    <Button>Login</Button>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
      {children}
      <div className="d-lg-none d-md-none d-sm-block">
        <Navbar expand="md" fixed="bottom" className="bg-danger">
          <NavLink to="/barang-bukti" className="d-flex flex-column align-items-center text-white" tag={Link}>
            <i className="ni ni-app" />
            <p className="m-0 mt-1">Cari</p>
          </NavLink>
          <NavLink to="/" className="d-flex flex-column align-items-center text-white" tag={Link}>
            <i className="ni ni-planet" />
            <p className="m-0 mt-1">Beranda</p>
          </NavLink>
          <NavLink className="d-flex flex-column align-items-center text-white" onClick={() => {
            if (profileDecode) {
              Cookies.remove('_T0123')
              Cookies.remove('_P01e')
              history.push('/')
            } else {
              history.push('/auth/login')
            }
          }}>
            <i className="ni ni-button-power" />
            <p className="m-0 mt-1">{profileDecode ? 'Logout' : 'Login'}</p>
          </NavLink>
        </Navbar>
      </div>
    </div>

  )
}

export default HomeNavbar