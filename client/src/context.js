import { createContext } from "react";

const Context = createContext({
  currentUser: null,
  isAuth: localStorage.getItem('auth-token') ? true : false
});

export default Context;
