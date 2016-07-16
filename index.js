import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import CountrySelection from "./containers/CountrySelection";
import PackageSelection from "./containers/PackageSelection";
import OrderSummary from "./containers/OrderSummary";
import DeliveryDetails from "./containers/DeliveryDetails";
import DeliveryConfirmation from "./containers/DeliveryConfirmation";
import ExtrasSelection from "./containers/ExtrasSelection";
import configureStore from "./store/configureStore";
import { Router, Route, browserHistory, IndexRedirect } from "react-router";
import "./index.html";

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRedirect to="/countrySelection" />
        <Route path="countrySelection" component={CountrySelection} />
        <Route path="packageSelection/:packageType" component={PackageSelection} />
        <Route path="extrasSelection" component={ExtrasSelection} />
        <Route path="orderSummary" component={OrderSummary} />
        <Route path="deliveryDetails" component={DeliveryDetails} />
        <Route path="deliveryConfirmation" component={DeliveryConfirmation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
)
