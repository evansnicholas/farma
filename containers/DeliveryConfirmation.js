import { connect } from "react-redux";
import DeliveryConfirmationInfo from "../components/DeliveryConfirmationInfo";

const mapStateToProps = (state) => {
  return state.data.orderNumber;
}

const DeliveryConfirmation = connect(
  mapStateToProps
)(DeliveryConfirmationInfo);

export default DeliveryConfirmation;
