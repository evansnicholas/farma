import { connect } from "react-redux";
import PackageSelector from "../components/PackageSelector";
import {
  updateProductSelectionState,
  fetchPackages
} from "../actions";

const mapStateToProps = (state) => {
  return {
    packages: state.packages
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleProductSelectionState: (productID) => {
      dispatch(updateProductSelectionState(productID))
    },
    fetchPackages: () => {
      dispatch(fetchPackages())
    }
  }
}

const PackageSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageSelector);

export default PackageSelection;
