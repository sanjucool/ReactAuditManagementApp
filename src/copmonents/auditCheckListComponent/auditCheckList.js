import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiBaseUrls from "../apiComponents/ApiEndPoint";
import axios from "axios";
function AuditCheckList() {
  const { state } = useLocation();
  const [auditCheckList, setAuditCheckList] = useState([]);
  const [respQuestion, setRespQuestion] = useState([]);
  const navigate = useNavigate();
  const [projectData, setAuditResponse] = useState(state);
  let auth = JSON.parse(localStorage.getItem("credential"));
  const loadQuestions = async (type) => {
    await axios
      .post(
        `${ApiBaseUrls.audit_checklist}/audit-checklist-questions`,
        {
          auditType: type,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((res) => {
        setAuditCheckList(res.data);
        setRespQuestion(res.data);
      });
  };

  const aduittype = (type) => {
    loadQuestions(type);
  };

  const handleChange = (questionId, auditType, isChecked) => {
    const questionList = respQuestion.map((item) => {
      if (item.auditType === auditType) {
        if (item.questionId === questionId) {
          console.log(item.questionId);
          if (item.response === "No") {
            item.response = "Yes";
          } else {
            item.response = "NO";
          }
          return item;
        }
      }
    });
  };

  const auditRequest = async (requestBody) => {
    await axios
      .post(
        `${ApiBaseUrls.audit_serverity}/project-execution-status`,
        requestBody,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((res) => {
        return navigate("/auditresponse", { state: res.data });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const auditdetails = {
      auditDetail: {
        auditDate: projectData.auditDate,
        auditQuestions: respQuestion,
        auditType: respQuestion[0].auditType,
      },
      managerName: projectData.projectManager,
      projectName: projectData.projectName,
    };
    auditRequest(auditdetails);
  };

  return (
    <div className="container">
      <div className="row my-3 bg-light">
        <div className="col-md-6 offset-3">
          <h1>Audit Management Portal</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div class="form-check form-check-inline">
          <label class="form-check-label" for="inlineRadio1">
            Audit Type
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            onClick={() => {
              aduittype("Internal");
            }}
            value="option1"
          />
          <label class="form-check-label" for="inlineRadio1">
            Internal
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            onClick={() => {
              aduittype("SOX");
            }}
            value="option2"
          />
          <label class="form-check-label" for="inlineRadio2">
            SOX
          </label>
        </div>
        <div className="container m-3">
          {auditCheckList !== undefined
            ? auditCheckList.map((item, index) => (
                <div class="form-check">
                  <label class="form-check-label">{item.question}</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onClick={(e) => {
                      handleChange(
                        item.questionId,
                        item.auditType,
                        e.target.value
                      );
                    }}
                    key={item.questionId}
                  />
                </div>
              ))
            : ""}
        </div>

        <div>
          <Link
            to="/home"
            className="btn btn-primary m-2 "
            style={{ textDecoration: "none" }}
            state={{
              projectName: projectData.projectName,
              projectManager: projectData.projectManager,
              projectOwner: projectData.projectOwner,
              auditDate: projectData.auditDate,
            }}
          >
            Previous
          </Link>
          <input type="submit" class="btn btn-primary" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default AuditCheckList;
