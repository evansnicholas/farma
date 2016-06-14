import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import CountrySelection from "./containers/CountrySelection";
import TravelDetails from "./containers/TravelDetails";
import ProductSelection from "./containers/ProductSelection";
import OrderSummary from "./containers/OrderSummary";
import DeliveryDetails from "./containers/DeliveryDetails";
import DeliveryConfirmation from "./containers/DeliveryConfirmation";
import configureStore from "./store/configureStore";
import { Router, Route, browserHistory, IndexRedirect } from "react-router";
import "./farma-css/index.css";
import "./assets/bootstrap-3.3.6-dist/css/bootstrap.min.css";

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRedirect to="/countrySelection" />
        <Route path="countrySelection" component={CountrySelection} />
        <Route path="travelDetails" component={TravelDetails} />
        <Route path="productSelection" component={ProductSelection} />
        <Route path="orderSummary" component={OrderSummary} />
        <Route path="deliveryDetails" component={DeliveryDetails} />
        <Route path="deliveryConfirmation" component={DeliveryConfirmation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
)
