import { connect } from "react-redux";
import PackageSelector from "../components/PackageSelector";
import {
  toggleProductVisibility,
  fetchPackagesAndExtras
} from "../actions";

const mapStateToProps = (state) => {
  return {
    packages: state.data.packages,
    countries: state.data.countries,
    showProductDetails: state.ui.showProductDetails
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleProductVisibility: (productID) => {
      dispatch(toggleProductVisibility(productID))
    },
    fetchPackagesAndExtras: (countries) => {
      dispatch(fetchPackagesAndExtras(countries))
    }
  }
}

const PackageSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageSelector);

export default PackageSelection;
