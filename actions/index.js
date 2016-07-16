import * as types from "../constants/ActionTypes";
import {extractCountry, computePackages, computeExtras} from "../utils/FarmaUtils";
import firebase from "firebase";

const GOOGLE_API_KEY = "AIzaSyDz-fA7ScCf27wZdfSh6qTpaObP-A9_WTU";
const app = firebase.initializeApp({
    apiKey: "AIzaSyCRvApjs46GDA12LuHmLBF1LRore1BWo4k",
    authDomain: "farma-a2488.firebaseapp.com",
    databaseURL: "https://farma-a2488.firebaseio.com",
    storageBucket: "farma-a2488.appspot.com",
});

// Sign in the user anonymously for now.
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.error(`Anonymous login failed: ${errorMessage}`);
});

export function addCountry(country) {
  return { type: types.ADD_COUNTRY, country: country };
}

export function removeCountry(country) {
  return { type: types.REMOVE_COUNTRY, country: country };
}

export function updateCountryTravelDetails(details) {
  return { type: types.UPDATE_TRAVEL_DETAILS, details: details };
}

export function updateDeliveryDetails(deliveryDetails) {
  return { type: types.UPDATE_DELIVERY_DETAILS };
}

export function fetchCountry(latLng) {
  var lat = latLng.lat();
  var lng = latLng.lng();
  var latLngParam = lat + "," +lng;

  return function(dispatch) {
    const url =
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLngParam}&key=${GOOGLE_API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        const country = extractCountry(json.results);
        return dispatch(addCountry(country));
      });
  }
}

export function updatePackagesAndExtras(packages, extras) {
  return { type: types.UPDATE_PACKAGES_AND_EXTRAS, packages, extras };
}

export function fetchPackagesAndExtras(countries) {
  const countryPromises = countries.map(c => {
    const country = c.country.toLowerCase();
    return firebase.database()
      .ref(`/countries/${country}`)
      .once("value")
      .then(v => {
        return Object.assign({}, v.val(), {details: c.details});
      });
  });

  const productsPromise = firebase.database()
    .ref("/products").once("value").then(v => v.val());

  return function(dispatch) {
      return Promise.all([...countryPromises, productsPromise]).then(values => {
        const products = values.pop();
        const packages = computePackages(values, products);
        const extras = computeExtras(values, products);
        return dispatch(updatePackagesAndExtras(packages, extras));
      }).catch(err => {
        console.log(`Getting packages failed: ${err}`);
      });
  }
}

export function toggleProductVisibility(prodId) {
  return { type: types.TOGGLE_PRODUCT_VISIBILITY, prodId };
}

export function toggleSelectedExtra(prodId) {
  return { type: types.TOGGLE_SELECTED_EXTRA, prodId };
}
