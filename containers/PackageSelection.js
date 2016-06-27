import { connect } from "react-redux";
import PackageSelector from "../components/PackageSelector";
import {
  updateProductSelectionState,
  fetchPackages
} from "../actions";

const mapStateToProps = (state) => {
  return {
    packages: state.packages,
    countries: state.countries
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleProductSelectionState: (productID) => {
      dispatch(updateProductSelectionState(productID))
    },
    fetchPackages: (countries) => {
      dispatch(fetchPackages(countries))
    }
  }
}

const PackageSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageSelector);

export default PackageSelection;
