import "./styles.css";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./context/authContext";
import { Routepath } from "./components/routepath";

export default function App() {
  const {
    state: { token, isLoggedIn }
  } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      return (axios.defaults.headers.common["Authorization"] = token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [isLoggedIn]);
  return (
    <div className="App">
      <h1>Contact Manager</h1>
      <Routepath />
    </div>
  );
}
