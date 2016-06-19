import * as types from "../constants/ActionTypes";
import {extractCountry} from "../utils/FarmaUtils";

const GOOGLE_API_KEY = "AIzaSyDz-fA7ScCf27wZdfSh6qTpaObP-A9_WTU";

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
