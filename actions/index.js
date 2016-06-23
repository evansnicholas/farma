import * as types from "../constants/ActionTypes";
import {extractCountry} from "../utils/FarmaUtils";
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

export function updateProductSelectionState(productID) {
 return { type: types.UPDATE_PRODUCT_SELECTION_STATE };
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

export function updateProducts(products) {
  return { type: types.UPDATE_PRODUCTS, products };
}

export function fetchProducts(countries) {
  const country = countries[0].country.toLowerCase();
  return function(dispatch) {
    return firebase.database().ref(`/countries/${country}`)
      .once("value")
      .then(snapshot => {
        return dispatch(updateProducts([snapshot.val().products]));
      });
  }
}
