export const SETLOGIN = "SETLOGIN";
export const SETLOGOUT = "SETLOGOUT";
export const reducerFunc = (state, action) => {
  console.log({ state, action }, 4);
  switch (action.type) {
    case SETLOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload
      };
    case SETLOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: action.payload
      };

    default:
      return { state };
  }
};
