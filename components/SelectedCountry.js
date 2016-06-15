import React from "react";

const SelectedCountry = ({
  country,
  onRemoveCountry
}) => (
  <div className="selected-country">
    <p onClick={() => onRemoveCountry(country)}
       className="text-center">
       {country}
    </p>
  </div>
);

export default SelectedCountry;
