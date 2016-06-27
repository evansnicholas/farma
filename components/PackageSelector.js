import React from "react";
import SelectedProduct from "./SelectedProduct";
import * as packageTypes from "../constants/PackageTypes";
import {Link} from "react-router";

export default class PackageSelector extends React.Component {
  getDisplayName() {
    return "PackageSelector";
  }

  constructor(props) {
    super(props);
    this.renderPackages = this.renderPackages.bind(this);
    this.getViewedPackage = this.getViewedPackage.bind(this);
    this.getViewedPackage = this.getViewedPackage.bind(this);
  }

  componentDidMount() {
    this.props.fetchPackages(this.props.countries);
  }

  renderPackages() {
    if (this.props.packages === null) {
      return <p>{"Computing packages"}</p>
    } else {
      const products = this.props.packages.get(Number(this.getViewedPackage()));
      return products.map((p, idx) => {
        return <div key={`product${idx}`}><p>{p.name}</p></div>
      });
    }
  }

  getViewedPackage() {
    return this.props.routeParams.packageType;
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
          <h1>{"Choose your package:"}</h1>
        </div>
        <div className="row">
          <div className="col-xs-9 col-xs-offset-1">
            <div id="package-tabs" className="row">
              <div className={`col-xs-4 ${basicClass}`}>
                <Link to={`/packageSelection/${packageTypes.BASIC}`}>
                  <h2>{"Basic"}</h2>
                </Link>
              </div>
              <div className={`col-xs-4 ${plusClass}`}>
                <Link to={`/packageSelection/${packageTypes.PLUS}`}>
                  <h2>{"Extra"}</h2>
                </Link>
              </div>
              <div className={`col-xs-4 ${excellentClass}`}>
                <Link to={`/packageSelection/${packageTypes.EXCELLENT}`}>
                  <h2>{"VIP"}</h2>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <p>{"This package will cover your basic needs."}</p>
                {this.renderPackages()}
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

export default PackageSelector;
