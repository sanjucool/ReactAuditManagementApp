import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  useEffect(() => {
    let initialStateCredential = {
      isAuthenticated: false,
      user: "",
      token: "",
    };
    localStorage.setItem("credential", JSON.stringify(initialStateCredential));
    return navigate("/", { replace: true });
  }, []);
};
export default Logout;
