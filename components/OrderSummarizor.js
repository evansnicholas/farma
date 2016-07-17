import React from "react";
import {Link} from "react-router";
import * as packageTypes from "../constants/PackageTypes";
import {
  findTotalProductsPrice,
  findAllProductsInPackage,
  findAllExtraProductDescriptions
} from "../utils/FarmaUtils";
import Product from "./Product";

export default class OrderSummarizor extends React.Component {
  getDisplayName() {
    return "OrderSummarizor";
  }

  constructor(props) {
    super(props);
    this.navigateToExtrasSelection = this.navigateToExtrasSelection.bind(this);
    this.renderSelectedPackage = this.renderSelectedPackage.bind(this);
    this.renderExtras = this.renderExtras.bind(this);
    this.findAllProductsAndTotalPrice = this.findAllProductsAndTotalPrice.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
    this.navigateToDeliveryDetails = this.navigateToDeliveryDetails.bind(this);
  }

  navigateToExtrasSelection() {
    this.context.router.push("/extrasSelection");
  }

  navigateToDeliveryDetails() {
    const {products, totalPrice} = this.findAllProductsAndTotalPrice();
    const productIds = products.map(p => p.id).toJS();
    this.props.onProceedToCheckout(
      totalPrice,
      this.props.selectedPackage,
      productIds
    );
    this.context.router.push("/deliveryDetails");
  }

  findAllProductsAndTotalPrice() {
    const packageProducts =
      findAllProductsInPackage(this.props.selectedPackage, this.props.packages);
    const extraProducts =
      findAllExtraProductDescriptions(
        this.props.selectedExtras,
        this.props.extras
      );
    const allProducts = packageProducts.concat(extraProducts);
    const totalPrice =
      findTotalProductsPrice(allProducts);

    return {products: allProducts, totalPrice};
  }

  renderProduct(product, idx) {
    const toggleProdVis = this.props.onToggleProductVisibility;
    const showProdDetails =
      this.props.showProductDetails.includes(product.id);
    return <Product key={`product${idx}`}
              product={product}
              showProductDetails={showProdDetails}
              onToggleProductVisibility={toggleProdVis}/>
  }

  renderSelectedPackage() {
    const packageName =
      packageTypes.getPackageDisplayName(this.props.selectedPackage);
    const products =
      findAllProductsInPackage(this.props.selectedPackage, this.props.packages);
    const renderedProducts = products.map((p, idx) =>
      this.renderProduct(p, idx)
    );

    return (
      <div>
        <h2>{`Package: ${packageName}`}</h2>
        {renderedProducts}
      </div>
    );
  }

  renderExtras() {
    const extraProducts =
      findAllExtraProductDescriptions(
        this.props.selectedExtras,
        this.props.extras
      );
    const renderedProducts = extraProducts.map((p, idx) =>
      this.renderProduct(p, idx)
    );

    return (
      <div>
        <h2>{"Extras"}</h2>
        {renderedProducts}
      </div>
    );
  }

  render() {
    const {totalPrice} = this.findAllProductsAndTotalPrice();

    return (
      <div className="container" id="order-summary">
        <div className="row farma-nav">
          <button className={`btn btn-default pull-left`}
            type="submit"
            onClick={() => {
              this.navigateToExtrasSelection()
            }}>
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              {"Extras Selection"}
          </button>
          <button className={`btn btn-default pull-right`}
            type="submit"
            onClick={() => {
              this.navigateToDeliveryDetails()
            }}>
              {"Checkout"}
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </button>
        </div>
        <div className="row">
          <h1>{"Order Summary"}</h1>
          <p>{`Total Price: \u20ac ${totalPrice}`}</p>
        </div>
        <div className="row">
          <div className="col-xs-9 col-xs-offset-1">
            {this.renderSelectedPackage()}
            {this.renderExtras()}
          </div>
        </div>
      </div>
    );
  }
}

OrderSummarizor.contextTypes = {
  router: React.PropTypes.object
}

export default OrderSummarizor;
