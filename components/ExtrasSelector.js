import React from "react";
import Product from "./Product";

export default class ExtrasSelector extends React.Component {
  getDisplayName() {
    return "ExtrasSelector";
  }

  constructor(props) {
    super(props);
    this.renderExtras = this.renderExtras.bind(this);
    this.navigateToOrderSummary = this.navigateToOrderSummary.bind(this);
  }

  navigateToOrderSummary() {
    this.context.router.push("/orderSummary");
  }

  renderExtras() {
    return this.props.extras.valueSeq().map((extra, idx) => {
      const showProdDetails = this.props.showProductDetails.includes(extra.id);
      const isSelected = this.props.selectedExtras.includes(extra.id);
      return (
        <Product key={`product${idx}`}
                product={extra}
                showProductDetails={showProdDetails}
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
