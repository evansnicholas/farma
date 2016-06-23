import { connect } from "react-redux";
import ProductSelector from "../components/ProductSelector";
import {
  updateProductSelectionState,
  fetchProducts
} from "../actions";

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    products: state.products
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleProductSelectionState: (productID) => {
      dispatch(updateProductSelectionState(productID))
    },
    fetchProducts: (countries) => {
      dispatch(fetchProducts(countries))
    }
  }
}

const ProductSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSelector);

export default ProductSelection;
