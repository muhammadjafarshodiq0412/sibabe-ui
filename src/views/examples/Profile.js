// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Spinner
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateUser } from "services/users";
import { useHistory } from "react-router-dom";

const Profile = () => {

  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    username: "nabhan",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');

  const history = useHistory();

  useEffect(() => {
    initialData()
  }, []);

  const initialData = () => {
    const profileCookies = Cookies.get('_P01e')
    const profileDecode = JSON.parse(atob(profileCookies))
    let payload
    if (profileDecode?.nik) {
      payload = {
        name: profileDecode?.name,
        phoneNumber: profileDecode?.phoneNumber,
        email: profileDecode?.email,
        username: profileDecode?.username,
        nik: profileDecode?.nik,
        password: "",
        role: "ADMIN",
        isActive: true
      }
    } else {
      payload = {
        name: profileDecode?.name,
        phoneNumber: profileDecode?.phoneNumber,
        email: profileDecode?.email,
        username: profileDecode?.username,
        password: "",
        role: "ADMIN",
        isActive: true
      }
    }
    setData(payload)
    setId(profileDecode?.id);
  }

  const submit = async (e) => {
    e.preventDefault()

    let errorValidasi = false

    Object.keys(data).some(keys => {
      if (data[keys] === '') {
        errorValidasi = true
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
      setLoading(true)
      const response = await updateUser(data, id)
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
          title: "Update Profil Berhasil",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setLoading(false)
          Cookies.remove('_T0123')
          Cookies.remove('_R8l')
          history.push('/auth/login')
        })
      }
    }
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submit}>
                  <h6 className="heading-small text-muted mb-4">
                    Informasi Pengguna
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Nama Lengkap User
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Inputkan Nama Lengkap User"
                            type="text"
                            value={data?.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-wa"
                          >
                            Nomor Whatsapp (WA)
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-wa"
                            placeholder="Inputkan Nomor Whatsapp (WA)"
                            type="text"
                            value={data?.phoneNumber}
                            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email Aktif
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Inputkan Email Aktif"
                            type="email"
                            value={data?.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Inputkan Username"
                            type="text"
                            value={data?.username}
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-password"
                            placeholder="Inputkan Password"
                            type="password"
                            value={data?.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        {loading ? (
                          <Spinner size="lg" color="dark" />
                        ) : (
                          <Button color="primary" type="submit">Simpan</Button>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
