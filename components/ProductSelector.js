import React from "react";
import SelectedProduct from "./SelectedProduct";
import {Link} from "react-router";

export default class ProductSelector extends React.Component {
  getDisplayName() {
    return "ProductSelector";
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProducts(this.props.countries);
  }

  render() {
    return (
      <div className="container" id="packages-choice">
        <div className="row">
          <h1>{"Choose your package:"}</h1>
        </div>
        <div className="row">
          <div className="col-xs-9 col-xs-offset-1">
            <div id="package-tabs" className="row">
              <div className="col-xs-4 selected-package">
                <h2>{"Basic"}</h2>
              </div>
              <div className="col-xs-4 package">
                <h2>{"Extra"}</h2>
              </div>
              <div className="col-xs-4 package">
                <h2>{"VIP"}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <p>{"This package will cover your basic needs."}</p>
                {this.props.products.map(p => {
                  return Object.keys(p).map(k => {
                    return <div><p>{k}</p></div>
                  })
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Link to="/orderSummary">
              <p className="next text-right">Next
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSelector;
