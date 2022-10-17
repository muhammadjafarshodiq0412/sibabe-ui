import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Badge
} from "reactstrap";
import Cookies from 'js-cookie'

const AdminNavbar = (props) => {

  const history = useHistory()

  const profileCookies = Cookies.get('_P01e')
  const profileDecode = JSON.parse(atob(profileCookies))

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav onClick={props.toggle}>
                <Media className="align-items-center notif">
                  <i className="ni ni-bell-55" />
                  {props.notif && <div className="notif-shape" />}
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow notification" right>
                {props?.data?.length > 0 ? props.data.map((val, idx) => {
                  return (
                    <DropdownItem className="noti-title" header tag="div" key={String(idx)}>
                      <h6 className="m-0">
                        <Badge color="success" className="mr-2">
                          <i className="ni ni-notification-70" />
                        </Badge>
                        Nomor Register Bukti (BA-5) <b>{val?.noRegBukti}</b> {val?.statusNoReg === 'OPEN' ? 'Belum Isi Form' : val?.statusNoReg === 'CLAIM' ? 'Sudah Isi Form' : 'Sudah Di Ambil'}
                      </h6>
                    </DropdownItem>
                  )
                }) : (
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="m-0">
                      Notifikasi Kosong
                    </h6>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <i className="ni ni-single-02" />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {profileDecode?.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => {
                  Cookies.remove('_T0123')
                  Cookies.remove('_P01e')
                  history.push('/auth/login')
                }}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
