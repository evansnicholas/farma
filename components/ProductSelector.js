import React from "react";
import SelectedProduct from "./SelectedProduct";
import {Link} from "react-router";

const ProductSelector = ({
  products,
  onToggleProductSelectionState
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-xs-12">
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Link to="/orderSummary">
            <p className="next">Next</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductSelector;
