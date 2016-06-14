import { connect } from "react-redux";
import OrderSummarizor from "../components/OrderSummarizor";

const mapStateToProps = (state) => {
  return state.products;
}

const OrderSummary = connect(
  mapStateToProps
)(OrderSummarizor);

export default OrderSummary;
