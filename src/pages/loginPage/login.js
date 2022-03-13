import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useProduct } from "../../context/productContext";
import { TOASTMESSAGE } from "../../context/productReducer";
import { SETLOGIN, SETLOGOUT } from "../../context/reducer";

export const Login = () => {
  const {
    state: { isLoggedIn },
    authDispatch
  } = useAuth();
  const { productDispatch } = useProduct();

  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });

  const handleInput = (e) => {
    setData((input) => {
      return { ...input, [e.target.name]: e.target.value };
    });
  };
  const Logout = () => {
    localStorage.removeItem("login");
    authDispatch({ type: SETLOGOUT, payload: null });
  };
  const signInHandler = async () => {
    try {
      const response = await axios.post(
        "https://contactmanager.sadhik.repl.co/login",
        {
          username: data.username,
          password: data.password
        }
      );

      console.log(response.data);
      if (response.status === 200 || 201) {
        localStorage.setItem(
          "login",
          JSON.stringify({ isLoggedIn: true, token: response.data.token })
        );
        authDispatch({ type: SETLOGIN, payload: response.data.token });
        navigate("/contacts");
      }
      // productDispatch({ type: TOASTMESSAGE, payload: "Login Successful" });
    } catch (err) {
      if (err.response.status === 401) {
        productDispatch({
          type: TOASTMESSAGE,
          payload: err.response.data.message
        });
      }
    }
  };
  const submitHandler = () => {
    if (!isLoggedIn) {
      signInHandler();
    } else {
      Logout();
    }
  };
  return (
    <>
      <h3>login page</h3>
      <div className="signupBox">
        <div className="registerForm">
          <label className="label">Username</label>
          <input
            onChange={handleInput}
            type="text"
            className="input"
            name="username"
          ></input>
        </div>
        <div className="registerForm">
          <label className="label">Password</label>
          <input
            onChange={handleInput}
            type="password"
            className="input"
            name="password"
          ></input>
        </div>

        <button onClick={submitHandler}>
          {isLoggedIn ? "logout" : "login"}
        </button>
        <p className="signIn">
          Don't Have a account?
          <span onClick={() => navigate("/signup")}>SignUp</span>
        </p>
      </div>
    </>
  );
};
