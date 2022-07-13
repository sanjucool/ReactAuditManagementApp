import { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";

function ResponseAudit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [auditResponse, setAuditResponse] = useState(state);
  const redirectHome = () => {
    localStorage.removeItem("auditResponse");
    navigate("/home");
  };
  return (
    <div className="container">
      <div className="row my-3 bg-light">
        <div className="col-md-6 offset-4">
          <h1>Audit Response</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table
            className="table table-borderless  text-white"
            style={{
              backgroundColor:
                auditResponse !== null
                  ? auditResponse.projectExecutionStatus
                  : "",
            }}
          >
            <tbody>
              <tr>
                <td>
                  <h3>Audit ID</h3>
                </td>
                <td>
                  <h4>{auditResponse !== null ? auditResponse.auditId : ""}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Project Excecution</h3>
                </td>
                <td>
                  <h4>
                    {auditResponse !== null
                      ? auditResponse.projectExecutionStatus
                      : ""}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Remedial Excecution Duration</h3>
                </td>
                <td>
                  <h4>
                    {auditResponse !== null
                      ? auditResponse.remedialActionDuration
                      : ""}
                  </h4>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <button className="btn btn-primary" onClick={redirectHome}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponseAudit;
