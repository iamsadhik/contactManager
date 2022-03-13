import { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "./reducer";
const AuthContext = createContext();
const loginDetails = JSON.parse(localStorage.getItem("login")) || {
  isLoggedIn: false,
  token: null
};

export const AuthProvider = ({ children }) => {
  const [state, authDispatch] = useReducer(reducerFunc, loginDetails);
  return (
    <>
      <AuthContext.Provider value={{ state, authDispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
