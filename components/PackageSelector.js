import React from "react";
import * as packageTypes from "../constants/PackageTypes";
import {Link} from "react-router";
import {
  findAllRelevantPackageTypes,
  findPackageTotalPrice
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
  }

  componentDidMount() {
    this.props.fetchPackages(this.props.countries);
  }

  renderProducts() {
    if (this.props.packages === null) {
      return <p>{"Computing packages"}</p>
    } else {
      const relevantPackageTypes =
        findAllRelevantPackageTypes(this.getViewedPackage());
      const products = relevantPackageTypes.map(pt => {
        return this.props.packages.get(pt);
      }).flatten();
      const totalPrice = findPackageTotalPrice(products);
      const allProducts = products.map((p, idx) => {
        const toggleProdVis = this.props.onToggleProductVisibility;
        return <Product key={`product${idx}`}
                  product={p}
                  onToggleProductVisibility={toggleProdVis}/>
      });

      return (
        <div>
          <h2>{`Total price: \u20ac ${totalPrice}`}</h2>
          {allProducts}
        </div>
      );
    }
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

  render() {
    const basicClass = this.getPackageClass(packageTypes.BASIC);
    const plusClass = this.getPackageClass(packageTypes.PLUS);
    const excellentClass = this.getPackageClass(packageTypes.EXCELLENT);
    return (
      <div className="container" id="packages-choice">
        <div className="row">
          <Link to={`/countrySelection`}>
            <div className="col-xs-2 next">
              <p className="text-left">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                {"Adjust Countries"}
              </p>
            </div>
          </Link>
        </div>
        <div className="row">
          <h1>{"Choose your package:"}</h1>
        </div>
        <div className="row">
          <div className="col-xs-9 col-xs-offset-1">
            <div id="package-tabs" className="row">
              <Link to={`/packageSelection/${packageTypes.BASIC}`}>
                <div className={`col-xs-4 ${basicClass}`}>
                  <h2>{"Basic"}</h2>
                </div>
              </Link>
              <Link to={`/packageSelection/${packageTypes.PLUS}`}>
                <div className={`col-xs-4 ${plusClass}`}>
                  <h2>{"Extra"}</h2>
                </div>
              </Link>
              <Link to={`/packageSelection/${packageTypes.EXCELLENT}`}>
                <div className={`col-xs-4 ${excellentClass}`}>
                  <h2>{"VIP"}</h2>
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

export default PackageSelector;
