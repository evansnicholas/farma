import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import CountrySelection from "./containers/CountrySelection";
import configureStore from "./store/configureStore";
import { Router, Route, browserHistory, IndexRedirect } from "react-router";
// import "todomvc-app-css/index.css"

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRedirect to="/selection" />
        <Route path="selection" component={CountrySelection} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
)
