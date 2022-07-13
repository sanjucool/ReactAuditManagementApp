import "./App.css";
import Main from "./copmonents/mainComponent/main";
import Login from "./copmonents/loginComponent/Login";
import AuditCheckList from "./copmonents/auditCheckListComponent/auditCheckList";
import ResponseAudit from "./copmonents/responseComponent/responseAudit";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import React from "react";
import Authenticate from "./copmonents/authComponent/authenticate";
import Logout from "./copmonents/logoutComponent/logout";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route
          exact
          path="/home"
          element={<Authenticate Component={Main} />}
        ></Route>
        <Route
          exact
          path="/auditchecklist"
          element={<Authenticate Component={AuditCheckList} />}
        ></Route>
        <Route
          exact
          path="/auditresponse"
          element={<Authenticate Component={ResponseAudit} />}
        ></Route>
        <Route
          exact
          path="/logout"
          element={<Authenticate Component={Logout} />}
        ></Route>
      </Routes>
      <Outlet />
    </Router>
  );
}

export default App;
