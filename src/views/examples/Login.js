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
  Col,
  Spinner
} from "reactstrap";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { setLogin } from "services/users";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()
    const data = {
      username,
      password
    }

    if (!username || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Email dan Password harus diisi!!!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setLoading(true)
      const response = await setLogin(data)
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
          title: "Login Berhasil",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setLoading(false)
          const token = response.payload.token
          const tokenBase64 = btoa(token)
          const profile = jwtDecode(token)
          const profileBase = btoa(JSON.stringify(profile.user_details))
          Cookies.set('_P01e', profileBase, { expires: 1 })
          Cookies.set('_T0123', tokenBase64, { expires: 1 })
          if (profile.user_details.role === 'ADMIN') {
            history.push('/admin/index')
          } else {
            history.push('/')
          }
        })
      }
    }
  }

  return (
    <>
      <Col lg="5" md="7">
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
              <small>Login</small>
            </div>
            <Form role="form" onSubmit={submit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="new-username"
                    onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
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
                <Link to="/auth/register" className="h-6">Daftar</Link>
              </div>
              <div className="text-center">
                {loading ? (
                  <Spinner size="lg" color="dark" />
                ) : (
                  <Button className="my-4" color="primary" type="submit">
                    Login
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

export default Login;
