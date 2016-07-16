import { connect } from "react-redux";
import DeliveryDetailsForm from "../components/DeliveryDetailsForm";
import { updateDeliveryDetails } from "../actions";

const mapStateToProps = (state) => {
  return state.data.deliveryDetails;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDeliveryDetails: (deliveryDetails) => {
      dispatch(updateDeliveryDetails(deliveryDetails))
    }
  }
}

const DeliveryDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryDetailsForm);

export default DeliveryDetails;
