import React from "react";
import Product from "./Product";
import * as packageTypes from "../constants/PackageTypes";

export default class ExtrasSelector extends React.Component {
  getDisplayName() {
    return "ExtrasSelector";
  }

  constructor(props) {
    super(props);
    this.renderExtras = this.renderExtras.bind(this);
    this.navigateToOrderSummary = this.navigateToOrderSummary.bind(this);
    this.navigateToPackageSelection = this.navigateToPackageSelection.bind(this);
  }

  navigateToOrderSummary() {
    this.context.router.push("/orderSummary");
  }

  navigateToPackageSelection() {
    this.context.router.push(`/packageSelection/${packageTypes.BASIC}`);
  }

  renderExtras() {
    return this.props.extras.valueSeq().map((extra, idx) => {
      const showProdDetails = this.props.showProductDetails.includes(extra.id);
      const isSelected = this.props.selectedExtras.includes(extra.id);
      return (
        <Product key={`product${idx}`}
                product={extra}
                showProductDetails={showProdDetails}
                showPrice
                onToggleSelectedProduct={this.props.onToggleSelectedExtra}
                isSelected={isSelected}
                onToggleProductVisibility={this.props.onToggleProductVisibility}/>
      );
    });
  }

  render() {
    return (
      <div className="container" id="extras-selection">
        <div className="row farma-nav">
          <button className={`btn btn-default pull-left`}
            type="submit"
            onClick={() => {
              this.navigateToPackageSelection()
            }}>
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              {"Package Selection"}
          </button>
          <button className={`btn btn-default pull-right`}
            type="submit"
            onClick={() => {
              this.navigateToOrderSummary()
            }}>{"Order Summary"}
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </button>
        </div>
        <div className="row">
          <h1>{"Choose your extras:"}</h1>
        </div>
        <div className="row">
          <div className="col-xs-9 col-xs-offset-1">
            {this.renderExtras()}
          </div>
        </div>
      </div>
    )
  }
}

ExtrasSelector.contextTypes = {
  router: React.PropTypes.object
}
