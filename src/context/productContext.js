import { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "./productReducer";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, productDispatch] = useReducer(reducerFunc, {
    toastmessage: "",
    contacts: []
  });

  return (
    <>
      <ProductContext.Provider value={{ state, productDispatch }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};
export const useProduct = () => {
  return useContext(ProductContext);
};
