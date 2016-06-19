import React from "react";
import {Link} from "react-router";
import CountryDetails from "./CountryDetails";

const TravelDetailsUpdator = ({countries}) => (
  <div className="container">
    {countries.map((c, index) => {
      return (
        <div key={c.country + index} className="row">
          <div className="col-xs-12">
            <CountryDetails country={c.country} />
          </div>
        </div>
      );
    })}
    <div className="row">
      <div className="col-xs-12">
        <Link to="/productSelection">
          <p className="next text-right">Next
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </p>
        </Link>
      </div>
    </div>
  </div>
);

export default TravelDetailsUpdator;
