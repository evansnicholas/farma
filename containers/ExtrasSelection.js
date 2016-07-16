import { connect } from "react-redux";
import ExtrasSelector from "../components/ExtrasSelector";
import {
  toggleProductVisibility,
  toggleSelectedExtra
} from "../actions";

const mapStateToProps = (state) => {
  return {
    extras: state.data.extras,
    selectedExtras: state.data.selectedExtras,
    showProductDetails: state.ui.showProductDetails
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleProductVisibility: (productID) => {
      dispatch(toggleProductVisibility(productID))
    },
    onToggleSelectedExtra: (productID) => {
      dispatch(toggleSelectedExtra(productID))
    }
  };
}

const ExtrasSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtrasSelector);

export default ExtrasSelection;
