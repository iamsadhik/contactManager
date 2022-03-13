import axios from "axios";
import "./styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/productContext";
import { ADDTOCONTACTS, TOASTMESSAGE } from "../../context/productReducer";

export const ContactManager = () => {
  const {
    state: { contacts },
    productDispatch
  } = useProduct();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://contactmanager.sadhik.repl.co/contacts"
        );

        if (response.status === 200 || 201) {
          productDispatch({ type: ADDTOCONTACTS, payload: response.data.list });
        }
      } catch (err) {
        console.log(err.response);
        if (err.response?.status === 401) {
          navigate("/login");
          productDispatch({
            type: TOASTMESSAGE,
            payload: "Login to Access and Add Contacts"
          });
        }
      }
    })();
  });

  return (
    <>
      <h3>contact list</h3>
      <button onClick={() => navigate("/addcontact")} className="add">
        Add New Contact
      </button>
      {contacts?.map((items) => (
        <>
          <div className="contactDetails">
            <div className="labels">
              <label>Name:</label> <span>{items?.firstName}</span>
              <span>{items?.lastName}</span>
            </div>
            <div className="labels">
              <label>Phone:</label>
              <span>{items?.phone}</span>
            </div>
            <div className="labels">
              <span>
                <label>Email:</label>
                <span>{items?.email}</span>
              </span>
            </div>
          </div>
        </>
      ))}
    </>
  );
};
