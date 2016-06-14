import * as types from "../constants/ActionTypes";
import * as journeyTypes from "../constants/JourneyTypes";

const initializeCountry = (country) => ({
  country: country,
  details: {
    journeyType: journeyTypes.NORMAL
  }
});

const initializeProduct = (productID, productName) => ({
  productID: productID,
  productName: productName,
  selected: true
});

const initialState = {
  countries: [],
  products: [],
  deliveryDetails: {
    email: null,
    firstName: null,
    lastName: null,
    streetName: null,
    houseNumber: null,
    houseNumberExtension: null,
    city: null,
    postcode: null
  },
  orderNumber: null
}

export function countries(state = initialState, action) {
  switch(action.type) {
    case types.ADD_COUNTRY:
      const newCountry = initializeCountry(action.country);
      const newCountries = state.countries.concat([newCountry]);
      return {
        countries: newCountries
      };
    case types.REMOVE_COUNTRY:
      const updatedCountries = state.countries.filter(c => {
        return c.country !== action.country;
      });
      return {
        countries: updatedCountries
      };
    default: return state;
  }
}
