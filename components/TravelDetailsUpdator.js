import React from "react";
import {Link} from "react-router";

const TravelDetailsUpdator = ({countries}) => (
  <div>
    {countries.map((c, index) => {
      return (
        <div key={c.country + index} className="row">
          <div className="col-xs-12">
            <p>{c.country}</p>
          </div>
        </div>
      );
    })}
    <div className="row">
      <div className="col-xs-12">
        <Link to="/productSelection">
          <p className="next">Next</p>
        </Link>
      </div>
    </div>
  </div>
);

export default TravelDetailsUpdator;
