import { Routes, Route, NavLink } from "react-router-dom";
import { Home } from "../pages/Home/home";
import { ContactManager } from "../pages/contactPage/contact";
import { Login } from "../pages/loginPage/login";
import { Signup } from "../pages/signUpPage/signup";
import { TOASTMESSAGE } from "../components/toaster";
import { ContactForm } from "../components/formPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../context/productContext";
export const Routepath = () => {
  const {
    state: { toastmessage }
  } = useProduct();
  return (
    <>
      <NavLink
        to="/contacts"
        style={{
          textDecoration: "none",
          padding: "7px",
          color: "#404040",
          fontWeight: "bold"
        }}
      >
        your Contact <FontAwesomeIcon icon={faAddressBook} />
      </NavLink>

      <NavLink
        to="/login"
        style={{
          textDecoration: "none",
          padding: "7px",
          color: "#404040",
          fontWeight: "bold"
        }}
      >
        Login
      </NavLink>

      <NavLink
        to="/signup"
        style={{
          textDecoration: "none",
          padding: "5px",
          color: "#404040",
          fontWeight: "bold"
        }}
      >
        Signup
      </NavLink>

      <Routes>
        <Route path="/" element={Home} />
        <Route path="/contacts" element={<ContactManager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addcontact" element={<ContactForm />} />
      </Routes>
      {toastmessage && <TOASTMESSAGE />}
    </>
  );
};
