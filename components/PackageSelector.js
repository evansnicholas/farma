import React from "react";
import * as packageTypes from "../constants/PackageTypes";
import {Link} from "react-router";
import {
  findTotalProductsPrice,
  findAllProductsInPackage
} from "../utils/FarmaUtils";
import Product from "./Product";

export default class PackageSelector extends React.Component {
  getDisplayName() {
    return "PackageSelector";
  }

  constructor(props) {
    super(props);
    this.renderProducts = this.renderProducts.bind(this);
    this.getViewedPackage = this.getViewedPackage.bind(this);
    this.getPackageClass = this.getPackageClass.bind(this);
    this.selectPackage = this.selectPackage.bind(this);
    this.navigateToCountrySelection = this.navigateToCountrySelection.bind(this);
  }

  componentDidMount() {
    this.props.fetchPackagesAndExtras(this.props.countries);
  }

  navigateToCountrySelection() {
    this.context.router.push("/countrySelection");
  }

  getViewedPackage() {
    return Number(this.props.routeParams.packageType);
  }

  getPackageClass(packageType) {
    return (
      (this.getViewedPackage() === packageType) ?
        "selected-package" : "package"
    );
  }

  selectPackage() {
    this.props.onSelectPackage(this.getViewedPackage());
    this.context.router.push("/extrasSelection");
  }

  renderProducts() {
    if (this.props.packages === null) {
      return <p>{"Computing packages"}</p>
    } else {
      const products = findAllProductsInPackage(
        this.getViewedPackage(),
        this.props.packages
      );
      const totalPrice = findTotalProductsPrice(products);
      const allProducts = products.map((p, idx) => {
        const toggleProdVis = this.props.onToggleProductVisibility;
        const showProdDetails =
          this.props.showProductDetails.includes(p.id);
        return <Product key={`product${idx}`}
                  product={p}
                  showProductDetails={showProdDetails}
                  onToggleProductVisibility={toggleProdVis}/>
      });

      return (
        <div>
          <div>
            <p>
              <strong className="package-price">{`Package price: \u20ac ${totalPrice}`}</strong>
              <button className="btn btn-default pull-right"
                  type="submit"
                  onClick={() => this.selectPackage()}>{"Select package"}</button>
            </p>
          </div>
          <div>
            {allProducts}
          </div>
        </div>
      );
    }
  }

  render() {
    const basicClass = this.getPackageClass(packageTypes.BASIC);
    const plusClass = this.getPackageClass(packageTypes.PLUS);
    const excellentClass = this.getPackageClass(packageTypes.EXCELLENT);
    return (
      <div className="container" id="packages-choice">
        <div className="row farma-nav">
          <button className={`btn btn-default pull-left`}
            type="submit"
            onClick={() => {
              this.navigateToCountrySelection()
            }}>
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              {"Country Selection"}
          </button>
        </div>
        <div className="row">
          <h1>{"Choose your package:"}</h1>
        </div>
        <div className="row">
          <div className="col-xs-9 col-xs-offset-1">
            <div id="package-tabs" className="row">
              <Link to={`/packageSelection/${packageTypes.BASIC}`}>
                <div className={`col-xs-4 ${basicClass}`}>
                  <h2>{packageTypes.BASIC_DISPLAY_NAME}</h2>
                </div>
              </Link>
              <Link to={`/packageSelection/${packageTypes.PLUS}`}>
                <div className={`col-xs-4 ${plusClass}`}>
                  <h2>{packageTypes.PLUS_DISPLAY_NAME}</h2>
                </div>
              </Link>
              <Link to={`/packageSelection/${packageTypes.EXCELLENT}`}>
                <div className={`col-xs-4 ${excellentClass}`}>
                  <h2>{packageTypes.EXCELLENT_DISPLAY_NAME}</h2>
                </div>
              </Link>
            </div>
            <div className="row">
              <div className="col-xs-12 package-info">
                {this.renderProducts()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PackageSelector.contextTypes = {
  router: React.PropTypes.object
}

export default PackageSelector;
