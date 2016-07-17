import { connect } from "react-redux";
import DeliveryConfirmationInfo from "../components/DeliveryConfirmationInfo";

const mapStateToProps = (state) => {
  return {
    orderStatus: state.order.orderStatus,
    orderKey: state.order.orderKey
  };
}

const DeliveryConfirmation = connect(
  mapStateToProps
)(DeliveryConfirmationInfo);

export default DeliveryConfirmation;
