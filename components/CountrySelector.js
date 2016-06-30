import React from "react";
import SelectedCountry from "./SelectedCountry";
import {Link} from "react-router";
import Map from "./Map";
import * as packageTypes from "../constants/PackageTypes";

class CountrySelector extends React.Component {

  getDisplayName() {
    return "CountrySelector";
  }

  constructor(props) {
    super(props);
    this.renderNoCountries = this.renderNoCountries.bind(this);
    this.renderCountries = this.renderCountries.bind(this);
  }

  renderNoCountries() {

    return (
      <div className="row">
        <div className="col-xs-12">
          <p id="select-text">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            {"Click on the map to select your destinations"}
          </p>
        </div>
      </div>
    );
  }

  renderCountries() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <Link to={`/packageSelection/${packageTypes.BASIC}`}>
              <p className="next text-center">Get products
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              </p>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.props.countries.map((c, index) => {
              return (
                <SelectedCountry country={c}
                   onRemoveCountry={this.props.onRemoveCountry}
                   onUpdateCountryTravelDetails={this.props.onUpdateCountryTravelDetails}
                   key={c + index}/>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const countries =
      (this.props.countries.length > 0) ?
        this.renderCountries() : this.renderNoCountries();

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 map-container">
            <Map onSelectCountry={this.props.onSelectCountry} />
          </div>
          <div className="col-md-4 countries">
            {countries}
          </div>
        </div>
      </div>
    );
  }

}

export default CountrySelector;
