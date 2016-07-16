import { connect } from "react-redux";
import OrderSummarizor from "../components/OrderSummarizor";

const mapStateToProps = (state) => {
  return {
    products: state.data.products
  };
}

const OrderSummary = connect(
  mapStateToProps
)(OrderSummarizor);

export default OrderSummary;
