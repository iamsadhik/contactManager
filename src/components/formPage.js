import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/productContext";
import { TOASTMESSAGE } from "../context/productReducer";

export const ContactForm = () => {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  });
  const { productDispatch } = useProduct();
  const changeHandler = (e) => {
    setFormInput((input) => {
      return { ...input, [e.target.name]: e.target.value };
    });
  };
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      const response = await axios.post(
        "https://contactmanager.sadhik.repl.co/contacts",
        {
          firstName: formInput.firstName,
          lastName: formInput.lastName,
          phone: formInput.phone,
          email: formInput.email
        }
      );
      console.log({ response });
      if (response.status === 201) {
        productDispatch({
          type: TOASTMESSAGE,
          payload: "Contact Saved"
        });
        navigate("/contacts");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        productDispatch({
          type: TOASTMESSAGE,
          payload: err.response.data.message
        });
      }
      console.log(err.response, 50);
    }
  };
  return (
    <>
      <h4>saving to database</h4>
      <div style={{ border: "none" }} className="signupBox">
        <div className="registerForm">
          <label className="label">Firstname</label>
          <input
            placeholder="Firstname"
            onChange={changeHandler}
            className="input"
            name="firstName"
          ></input>
        </div>
        <div className="registerForm">
          <label className="label">Lastname</label>
          <input
            placeholder="Lastname"
            onChange={changeHandler}
            className="input"
            name="lastName"
          ></input>
        </div>
        <div className="registerForm">
          <label className="label">Phone-Number</label>
          <input
            onChange={changeHandler}
            type="number"
            placeholder="Phone"
            max="10"
            className="input"
            name="phone"
          ></input>
        </div>
        <div className="registerForm">
          <label className="label">Email</label>
          <input
            placeholder="Email"
            onChange={changeHandler}
            className="input"
            name="email"
          ></input>
        </div>

        <button onClick={submitHandler}>Save</button>
      </div>
    </>
  );
};
