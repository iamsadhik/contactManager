import { useEffect } from "react";
import { useProduct } from "../context/productContext";
import "./styles.css";
export const TOASTMESSAGE = () => {
  const {
    state: { toastmessage },
    productDispatch
  } = useProduct();
  const close = () => {
    productDispatch({ type: TOASTMESSAGE, payload: null });
  };
  useEffect(() => {
    const timer = setTimeout(close, 3000);
    return () => clearTimeout(timer);
  });
  return (
    <>
      <p className="toastmessage">{toastmessage}</p>
    </>
  );
};
