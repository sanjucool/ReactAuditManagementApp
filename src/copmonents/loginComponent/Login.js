import pic from "./static/authicon.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiBaseUrls from "../apiComponents/ApiEndPoint";
function Login() {
  let navigate = useNavigate();
  let auth = JSON.parse(localStorage.getItem("credential"));
  useEffect(() => {
   if(auth!=null)
   {
    if (auth.authenticated) {
      navigate("/home");
    }
   }
  }, []);

  const initialState = {
    username: "",
    password: "",
    errors: {
      uname: "",
      pass: "",
    },
    invalidLogin: "",
  };

  const [state, setState] = useState(initialState);

  const validateForm = () => {
    
    let unameError = "";
    let passwordError = "";
    if (state.username.trim() === "") unameError = "Username Is Required";
    if (state.password.trim() === "") passwordError = "Password Is Required";
    if (unameError.trim() === "" && passwordError.trim() === "") {
   
      return true;
    } else {
      let err = {
        uname: unameError,
        pass: passwordError,
      };
      setState({
        ...state,
        errors: err,
        invalidLogin: "",
      });
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    let val = validateForm();
   
    if (val) {
      let user={
        username:state.username,
        password:state.password
      }
      console.log(user);
     
      axios.post(`${ApiBaseUrls.authenticate_microservice}/authenticate`,user)
      .then((res)=>{
          console.log(res.data);
          if(res.data)
          {
            console.log("done")
            localStorage.setItem(
              "credential",
              JSON.stringify(res.data)
            );
             return navigate("/home");
          }
            }
        ).catch((error)=>{
          setState({
            ...state,
            invalidLogin: "Invalid Credential",
          });
         
        }) 
        
    } 
  
  }

  return (
    <div className="container-fluid">
      <div className="row my-3">
        <div className="col-md-6 offset-1">
          <h1>Audit Management Portal</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-3 offset-2">
          <img src={pic} alt="pic" className="img-fluid" />
        </div>
        <div className="col-5">
          <h2 className="text-center">Login</h2>
          <div
            id="passwordHelp"
            className="form-text text-center"
            style={{ color: "red" }}
          >
            {state.invalidLogin.trim() !== ""
              ? "Invalid Username/Password Credential"
              : ""}
          </div>
          <form onSubmit={handleSubmit} >
            <div className="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={handleChange}
              />
              <small
                id="usernameHelp"
                className="form-text"
                style={{ color: "red" }}
              >
                {state.errors.uname.trim() !== "" ? "Username is required" : ""}
              </small>
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
              <small
                id="passwordHelp"
                className="form-text"
                style={{ color: "red" }}
              >
                {state.errors.pass.trim() !== "" ? "Password is required" : ""}
              </small>
            </div>
            {/* <Link  to="/home" className="btn btn-primary my-2"  style={{'textDecoration':'none'}}>Submit</Link> */}
            <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
