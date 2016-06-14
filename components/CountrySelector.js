import React from "react";
import SelectedCountry from "./SelectedCountry";
import {Link} from "react-router";

class CountrySelector extends React.Component {

  getDisplayName() {
    return "CountrySelector";
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(google);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 map">
            <p onClick={() => this.props.onAddCountry("UK")}>Click</p>
            <div className="map" ref={c => {
              new google.maps.Map(c, {
                center: {lat: 50, lng: 0},
                scrollwheel: false,
                zoom: 2
              });
            }} />
          </div>
          <div className="col-md-4 countries">
            {this.props.countries.map((c, index) => {
              return (
                <SelectedCountry country={c.country}
                   onRemoveCountry={this.props.onRemoveCountry}
                   key={c + index}/>
              );
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Link to="/travelDetails">
              <p className="next">Next</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

}

export default CountrySelector;
