import { connect } from "react-redux";
import OrderSummarizor from "../components/OrderSummarizor";
import {
  toggleProductVisibility,
  updateOrder
} from "../actions";

const mapStateToProps = (state) => {
  return {
    packages: state.data.packages,
    extras: state.data.extras,
    selectedPackage: state.data.selectedPackage,
    selectedExtras: state.data.selectedExtras,
    showProductDetails: state.ui.showProductDetails
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleProductVisibility: (productID) => {
      dispatch(toggleProductVisibility(productID))
    },
    onProceedToCheckout: (totalPrice, selectedPackage, products) => {
      dispatch(updateOrder({
        totalPrice,
        packageType: selectedPackage,
        products
      }))
    }
  };
}

const OrderSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummarizor);

export default OrderSummary;
