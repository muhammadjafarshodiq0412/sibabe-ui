/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { getItemEvidance } from "services/itemEvidances";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const [data, setData] = useState([]);
  const [notif, setNotif] = useState(false);

  const getItemEvidanceList = async () => {
    const response = await getItemEvidance({
      currentPage: 0,
      limit: 5,
      filter: "",
      category: "",
      status: ""
    })
    if (!response.error) {
      const objectsAreSame = (x, y) => {
        var value = true;
        for (var propertyName in x) {
          if (JSON.stringify(x[propertyName]) !== JSON.stringify(y[propertyName])) {
            value = false;
            break;
          }
        }
        return value;
      }
      let _notif
      await Promise.all([1].map((val) => {
        _notif = objectsAreSame(response.payload.content, data)
        return true
      }))
      if (!_notif) {
        setNotif(true);
      }
      setData(response.payload.content)
    }
  }

  useEffect(() => {
    setInterval(() => {
      getItemEvidanceList()
    }, 500000)
  }, []);

  useEffect(() => {
    getItemEvidanceList()
  }, [])

  const toggle = () => setNotif(false);

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/logo.jpeg"),
          imgAlt: "..."
        }}
        data={data}
        notif={notif}
        toggle={toggle}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
          data={data}
          notif={notif}
          toggle={toggle}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </div>
    </>
  );
};

export default Admin;
