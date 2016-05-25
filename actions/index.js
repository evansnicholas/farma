import * as types from "../constants/ActionTypes";

export function addCountry(country) {
  return { type: types.ADD_COUNTRY, country: country };
}
