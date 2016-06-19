import * as types from "../constants/ActionTypes";
import * as details from "../constants/TravelDetails";

const initializeCountry = (country) => ({
  country: country,
  details: {
    company: details.ALONE,
    adventurous: "false",
    luxurious: "false",
    period: 1
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
    case types.ADD_COUNTRY: {
      const newCountry = initializeCountry(action.country);
      const newCountries = state.countries.concat([newCountry]);
      return {
        countries: newCountries
      };
    }
    case types.REMOVE_COUNTRY: {
      const updatedCountries = state.countries.filter(c => {
        return c.country !== action.country;
      });
      return {
        countries: updatedCountries
      };
    }
    case types.UPDATE_TRAVEL_DETAILS: {
     const updatedCountries = state.countries.map(c => {
       if (c.country === action.details.country) {
         const updatedDetails = Object.assign({},
           c.details,
           action.details.data
         );
         return {
           country: c.country,
           details: updatedDetails
         };
       } else {
         return c;
       }
     });
     return Object.assign({}, state, {countries: updatedCountries});
    }
    default: return state;
  }
}
