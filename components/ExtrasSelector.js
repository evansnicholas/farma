import React from "react";
import Product from "./Product";

export default class ExtrasSelector extends React.Component {
  getDisplayName() {
    return "ExtrasSelector";
  }

  constructor(props) {
    super(props);
    this.renderExtras = this.renderExtras.bind(this);
  }

  renderExtras() {
    return this.props.extras.valueSeq().map((extra, idx) => {
      return (
        <Product key={`product${idx}`}
                product={extra}
                onToggleProductVisibility={() => console.log("...")}/>
      );
    });
  }

  render() {
    return (
      <div className="container" id="extras-selection">
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
