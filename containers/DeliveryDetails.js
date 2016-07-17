import { connect } from "react-redux";
import DeliveryDetailsForm from "../components/DeliveryDetailsForm";
import { updateOrder, sendOrder } from "../actions";

const mapStateToProps = (state) => {
  return { order: state.order };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDeliveryDetails: (deliveryDetails) => {
      dispatch(updateOrder(deliveryDetails))
    },
    onSubmitOrder: (order) => {
      dispatch(sendOrder(order))
    }
  }
}

const DeliveryDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryDetailsForm);

export default DeliveryDetails;
