// reactstrap components
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner
} from "reactstrap";
import { setUser } from "services/users";
import Swal from "sweetalert2";

const Register = () => {

  const [data, setData] = useState({
    nik: "",
    name: "",
    username: "",
    password: "",
    role: "USER",
    isActive: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const history = useHistory()

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
      const response = await setUser(data)
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
          title: "Register Berhasil",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setLoading(false)
          history.push('/auth/login')
        })
      }
    }
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5 text-center">
            <img
              alt="..."
              className="img-login rounded"
              src={
                require("../../assets/img/brand/logo.jpeg")
              }
            />
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Register</small>
            </div>
            <Form role="form" onSubmit={submit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nomor Identitas (KTP/SIM)" type="text" onChange={(e) => setData({ ...data, nik: e.target.value })} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nama Lengkap" type="text" onChange={(e) => setData({ ...data, name: e.target.value })} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="new-username"
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="d-flex justify-content-between">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Show Password</span>
                      </label>
                    </div>
                    <Link to="/auth/login" className="h-6">Login</Link>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                {loading ? (
                  <Spinner size="lg" color="dark" />
                ) : (
                  <Button className="my-4" color="primary" type="submit">
                    Buat Akun
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
