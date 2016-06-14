import * as types from "../constants/ActionTypes";

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
