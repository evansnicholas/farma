import { connect } from "react-redux";
import ProductSelector from "../components/ProductSelector";
import { updateProductSelectionState } from "../actions";

const mapStateToProps = (state) => {
  return state.products;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleProductSelectionState: (productID) => {
      dispatch(updateProductSelectionState(productID))
    }
  }
}

const ProductSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSelector);

export default ProductSelection;
