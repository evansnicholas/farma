import * as types from "../constants/ActionTypes";

const initialState = {
    totalPrice: null,
    packageType: null,
    products: null,
    email: null,
    firstName: null,
    lastName: null,
    address: null,
    city: null,
    postcode: null,
    orderStatus: null,
    orderKey: null
}

export default function order(state = initialState, action) {
  switch(action.type) {
    case types.UPDATE_ORDER:
      const orderDetails = action.orderDetails;
      return Object.assign({}, state, orderDetails);
    default:
      return state;
  }
}
