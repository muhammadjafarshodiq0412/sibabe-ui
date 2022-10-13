import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
import Login from "views/examples/Login";
import Register from "views/examples/Register";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-danger");
    return () => {
      document.body.classList.remove("bg-danger");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <div className="header bg-danger py-6 py-lg-8" />
        {/* Page content */}
        <Container className="mt--8">
          <Row className="justify-content-center">
            <Switch>
              <Route component={Login} path="/auth/login" />
              <Route component={Register} path="/auth/register" />
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Auth;
