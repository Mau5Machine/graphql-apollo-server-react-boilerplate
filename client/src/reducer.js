export default function reducer(state, { type, payload }) {
  switch (type) {
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload
      };
    case "LOGIN":
      return {
        ...state,
        currentUser: payload
      };
    default:
      return state;
  }
}
