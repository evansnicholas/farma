import * as types from "../constants/ActionTypes";
import * as details from "../constants/TravelDetails";

const initializeCountry = (country) => ({
  country: country,
  details: {
    adults: 1,
    children: 0,
    period: 1
  }
});

const initialState = {
  countries: [],
  packages: null,
  extras: null,
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

export function app(state = initialState, action) {
  switch(action.type) {
    case types.ADD_COUNTRY: {
      const newCountry = initializeCountry(action.country);
      const newCountries = state.countries.concat([newCountry]);
      const newState = Object.assign({}, state, {
        countries: newCountries
      });
      return newState;
    }
    case types.REMOVE_COUNTRY: {
      const updatedCountries = state.countries.filter(c => {
        return c.country !== action.country;
      });
      return Object.assign({}, state, {
        countries: updatedCountries
      });
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
    case types.UPDATE_PACKAGES_AND_EXTRAS: {
      return Object.assign({}, state,
        {packages: action.packages},
        {extras: action.extras}
      )
    }
    case types.TOGGLE_PRODUCT_VISIBILITY: {
      const updatedPackages = state.packages.map(products => {
        return products.map(p => {
          if (p.id === action.prodId) {
            return Object.assign({}, p, {showDetails: !p.showDetails});
          } else {
            return p;
          }
        });
      });
      return Object.assign({}, state, {packages: updatedPackages});
    }
    default: return state;
  }
}
