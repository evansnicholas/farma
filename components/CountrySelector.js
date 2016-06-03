import React from "react";

const CountrySelector = ({countries, onMapClick}) => (
  <ul>
    {countries.map(c => <li>{c}</li>)}
  </ul>
)

export default CountrySelector;
