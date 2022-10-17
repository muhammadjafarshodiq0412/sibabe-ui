import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Landing from "layouts/Landing";
import ItemEvidance from "layouts/ItemEvidance";
import PrivateRoute from "helpers/privateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={(props) => <Landing {...props} />} />
      <Route path="/barang-bukti" render={(props) => <ItemEvidance {...props} />} />
      <PrivateRoute
        path="/admin"
        name="admin"
        privateComponent={AdminLayout}
      />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
    </Switch>
  </BrowserRouter>
);
