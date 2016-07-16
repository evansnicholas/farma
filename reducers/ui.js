import immutable from "immutable";
import * as types from "../constants/ActionTypes";

const initialState = {
  showProductDetails: immutable.Set()
}

export default function ui(state = initialState, action) {
  switch(action.type) {
    case types.TOGGLE_PRODUCT_VISIBILITY: {
      const prodId = action.prodId;
      if (state.showProductDetails.includes(prodId)) {
        return Object.assign({}, state,
          {showProductDetails: state.showProductDetails.delete(prodId)}
        );
      } else {
        return Object.assign({}, state,
          {showProductDetails: state.showProductDetails.add(prodId)}
        );
      }
    }
    default:
      return state;
  }
}
