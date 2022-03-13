import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/productContext";
import { TOASTMESSAGE } from "../../context/productReducer";
import "./signup.css";
export const Signup = () => {
  const { productDispatch } = useProduct();
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: ""
  });
  const changeHandler = (e) => {
    setFormInput((input) => {
      return { ...input, [e.target.name]: e.target.value };
    });
  };
  const signupHandler = async () => {
    try {
      const response = await axios.post(
        "https://contactmanager.sadhik.repl.co/user",
        {
          fullName: formInput.fullName,
          username: formInput.username,
          email: formInput.email,
          password: formInput.password
        }
      );

      if (response.status === 201) {
        productDispatch({ type: TOASTMESSAGE, payload: "SignUp Successful" });
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        productDispatch({
          type: TOASTMESSAGE,
          payload: err.response.data.message
        });
      }
    }

    return <></>;
  };
  return (
    <>
      <h3>signUp page</h3>
      <div className="signupBox">
        <div className="registerForm">
          <label className="label">FullName</label>
          <input
            onChange={changeHandler}
            className="input"
            name="fullName"
          ></input>
        </div>
        <div className="registerForm">
          <label className="label">Username</label>
          <input
            onChange={changeHandler}
            className="input"
            name="username"
          ></input>
        </div>
        <div className="registerForm">
          <label className="label">Email</label>
          <input
            onChange={changeHandler}
            className="input"
            name="email"
          ></input>
        </div>

        <div className="registerForm">
          <label className="label">Password</label>
          <input
            onChange={changeHandler}
            type="password"
            className="input"
            name="password"
          ></input>
        </div>

        <button onClick={signupHandler}>Signup</button>
        <p className="signIn">
          Have a account?<span onClick={() => navigate("/login")}>SignIn</span>
        </p>
      </div>
    </>
  );
};
