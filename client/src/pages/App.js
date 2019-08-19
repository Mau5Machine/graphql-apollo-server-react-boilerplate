import React, { useContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withRoot from "../withRoot";
import Context from "../context";
import reducer from "../reducers";
import Home from "../components/Home";
import Login from "../components/Login";
import NavBar from '../components/NavBar'
import ProtectedRoute from '../ProtectedRoute'

const App = () => {
  const initialState = useContext(Context);
  const [appState, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <Context.Provider value={{ appState, dispatch }}>
        <NavBar />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Context.Provider>
    </Router>
  );
};

export default withRoot(App);
