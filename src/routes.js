import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import ItemEvidance from "views/examples/ItemEvidance";
import InfoPickup from "views/examples/InfoPickup";
import User from "views/examples/User";
import Kejari from "views/examples/Kejari";
import MonitoringKejari from "views/examples/MonitoringKejari";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/barang-bukti",
    name: "Barang Bukti",
    icon: "ni ni-planet text-blue",
    component: ItemEvidance,
    layout: "/admin"
  },
  {
    path: "/info-pengambilan",
    name: "Info Pengambilan",
    icon: "ni ni-pin-3 text-orange",
    component: InfoPickup,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Data User",
    icon: "ni ni-single-02 text-yellow",
    component: User,
    layout: "/admin"
  },
  {
    path: "/kejari",
    name: "Data Kejari",
    icon: "ni ni-bullet-list-67 text-red",
    component: Kejari,
    layout: "/admin"
  },
  {
    path: "/monitoring-kejari",
    name: "Monitong Kejari",
    icon: "ni ni-key-25 text-info",
    component: MonitoringKejari,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-circle-08 text-pink",
    component: Profile,
    layout: "/admin"
  }
];
export default routes;
