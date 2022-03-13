import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProductProvider } from "./context/productContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
