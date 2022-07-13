import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Main(props) {
  const location = useLocation();
  const pd = location.state;
  const initialState = {
    projectName: pd != null ? pd.projectName : "",
    projectManager: pd != null ? pd.projectManager : "",
    projectOwner: pd != null ? pd.projectOwner : "",
    auditDate: pd != null ? pd.auditDate : "",
    errors: {
      pname: "",
      pmanager: "",
      powner: "",
      auditdate: "",
    },
  };

  const [state, setState] = useState(initialState);

  const username = JSON.parse(localStorage.getItem("credential"));

  const validateForm = () => {
    let pnameError = "";
    let pmanagerError = "";
    let pownerError = "";
    let auditadateError = "";
    if (state.projectName.trim() === "")
      pnameError = "Project Name Is Required";
    if (state.projectManager.trim() === "")
      pmanagerError = "Project Manager Is Required";
    if (state.projectOwner.trim() === "")
      pownerError = "Project Owner Is Required";
    if (state.auditDate === "") auditadateError = "Audit Date Is  Required";
    if (
      pnameError.trim() === "" &&
      pmanagerError.trim() === "" &&
      pownerError.trim() === "" &&
      auditadateError === ""
    ) {
      return true;
    } else {
      let err = {
        pname: pnameError,
        pmanager: pmanagerError,
        powner: pownerError,
        auditdate: auditadateError,
      };
      setState({
        ...state,
        errors: err,
      });
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  let navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    let val = validateForm();
    let projectDetails = {
      projectName: state.projectName,
      projectManager: state.projectManager,
      projectOwner: state.projectOwner,
      auditDate: state.auditDate,
    };
    if (val) {
      return navigate(`/auditchecklist`, { state: projectDetails });
    }
  }

  return (
    <div className="container-fluid m-0 p-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h3 className="navbar-brand">Audit Management Portal</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <ul className="d-flex m-2">
              <li style={{ listStyleType: "none" }}>
                <span className="fa fa-user px-1"></span>Welcome {username.name}
              </li>
              <Link
                to="/logout"
                style={{ textDecoration: "none" }}
                className="px-2"
              >
                <span
                  className="fa fa-sign-in px-1"
                  onClick={() => {
                    console.log("logout");
                  }}
                ></span>
                Logout
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container my-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group row my-2">
            <label for="projectName" className="col-sm-2 col-form-label">
              Project Name
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={state.projectName !== "" ? state.projectName : ""}
                onChange={handleChange}
              />
              <small
                id="pnameHelp"
                className="form-text"
                style={{ color: "red" }}
              >
                {state.errors.pname.trim() !== ""
                  ? "Project Name is required"
                  : ""}
              </small>
            </div>
          </div>
          <div className="form-group row my-2">
            <label for="projectManager" class="col-sm-2 col-form-label">
              Project Manager
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                name="projectManager"
                value={state.projectManager !== "" ? state.projectManager : ""}
                onChange={handleChange}
              />
              <small
                id="pmanagerHelp"
                className="form-text"
                style={{ color: "red" }}
              >
                {state.errors.pmanager.trim() !== ""
                  ? "Project Manager is required"
                  : ""}
              </small>
            </div>
          </div>
          <div class="form-group row my-2">
            <label for="projectOwner" className="col-sm-2 col-form-label">
              Project Owner
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="projectOwner"
                value={state.projectOwner !== "" ? state.projectOwner : ""}
                onChange={handleChange}
              />
              <small
                id="pownerHelp"
                className="form-text"
                style={{ color: "red" }}
              >
                {state.errors.powner.trim() !== ""
                  ? "Project Owner is required"
                  : ""}
              </small>
            </div>
          </div>
          <div className="form-group row my-2">
            <label for="auditDate" className="col-sm-2 col-form-label">
              Audit Date
            </label>
            <div className="col-sm-8">
              <input
                type="date"
                className="form-control"
                name="auditDate"
                value={state.auditDate !== "" ? state.auditDate : null}
                onChange={handleChange}
              />
              <small
                id="adateHelp"
                className="form-text"
                style={{ color: "red" }}
              >
                {state.errors.auditdate !== "" ? "Audit Date is required" : ""}
              </small>
            </div>
          </div>
          <div className="form-group row my-2">
            <div className="col-sm-2 offset-2">
              <input
                type="submit"
                class="btn btn-primary form-control"
                value="Next"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Main;
