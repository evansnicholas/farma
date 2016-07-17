import React from "react";
import {Link} from "react-router";
import * as orderStates from "../constants/OrderStates";

const DeliveryConfirmationInfo = ({
  orderStatus,
  orderKey
}) => {
  let orderMessage = null;
  switch(orderStatus) {
    case orderStates.PROCESSING_ORDER:
       orderMessage = <p>{"The order is being processed"}</p>;
       break;
    case orderStates.ORDER_SUCCESSFUL:
      orderMessage = (
        <div>
          <p>{"The order was successful"}</p>
          <p>{`Order id: ${orderKey}`}</p>
        </div>
      );
      break;
    case orderStates.ORDER_FAILED:
      orderMessage = <p>{"Placing your order failed."}</p>;
      break
    default:
      orderMessage = <p>{"Order status unknown"}</p>;
      break;
  };

  return (
    <div className="container" id="order-confirmation">
      <div className="row">
        <h1>{"Order Status"}</h1>
      </div>
      <div className="row">
        <div className="col-xs-9 col-xs-offset-1">
          {orderMessage}
        </div>
      </div>
    </div>
  )
};

export default DeliveryConfirmationInfo;
