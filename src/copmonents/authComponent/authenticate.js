import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authenticate(props) {
  const navigate = useNavigate();
  const { Component } = props;
  let auth = JSON.parse(localStorage.getItem("credential"));
  useEffect(() => {
    if (auth === null) {
      navigate("/");
    } else {
      if (!auth.authenticated) {
        navigate("/");
      }
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}
export default Authenticate;
