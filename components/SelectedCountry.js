import React from "react";

const SelectedCountry = ({
  country,
  onRemoveCountry
}) => (
  <div className="selected-country">
    <p>{country}
      <span onClick={() => onRemoveCountry(country)}
          className="glyphicon-remove"></span>
    </p>
  </div>
);

export default SelectedCountry;
