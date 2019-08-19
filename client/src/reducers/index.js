export default function reducer(state, { type, payload }) {
  switch (type) {
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload
      };
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: payload
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        currentUser: null
      }
    default:
      return state;
  }
}
