export const TOASTMESSAGE = "TOASTMESSAGE";
export const ADDTOCONTACTS = "ADDTOCONTACTS";
export const reducerFunc = (state, action) => {
  switch (action.type) {
    case TOASTMESSAGE:
      return { ...state, toastmessage: action.payload };
    case ADDTOCONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return { state };
  }
};
