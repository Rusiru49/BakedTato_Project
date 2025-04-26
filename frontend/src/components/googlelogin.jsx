import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../services/firebase.js";
import GoogleButton from "react-google-button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { FaGoogle } from "react-icons/fa";

const LoginG = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const signinwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
      toast.success(
        `Login successfully with Google , hello ${user.displayName}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        style={{
          borderRadius: "20px",
          backgroundColor: "blue",
          color: "white",
          fontSize: "14px",
        }}
        onClick={signinwithGoogle}
      >
        <FaGoogle />
      </Button>
      <ToastContainer
        position="top-right"
        autoClose={1000} // Close the toast after 3 seconds
      />
    </div>
  );
};
export default LoginG;
