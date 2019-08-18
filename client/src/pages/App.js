import React, { useContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withRoot from "../withRoot";
import Context from "../context";
import reducer from "../reducer";
import Home from "../components/Home";
import Login from "../components/Login";

const App = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Context.Provider>
    </Router>
  );
};

export default withRoot(App);
