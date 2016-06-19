import React from "react";
import * as travelDetails from "../constants/TravelDetails";

const CountryDetails = ({countryDetails, onUpdateCountryTravelDetails}) => {
  const country = countryDetails.country;
  const companySelectId = `${country.country}CompanySelect`;
  const adventurousSelectId = `${country.country}AdventurousSelect`;
  const luxuriousSelectId = `${country.country}LuxuriousSelect`;
  const durationSpecId = `${country.country}DurationSpec`;
  const updateCompany = (event) => {
    onUpdateCountryTravelDetails({
      country,
      data: {
        company: event.target.value
      }
    });
  };
  const updateAdventurous = (event) => {
    onUpdateCountryTravelDetails({
      country,
      data: {
        adventurous: event.target.value
      }
    })
  };
  const updateLuxurious = (event) => {
    onUpdateCountryTravelDetails({
      country,
      data: {
        luxurious: event.target.value
      }
    })
  };
  const updatePeriod = (event) => {
    onUpdateCountryTravelDetails({
      country,
      data: {
        period: event.target.value
      }
    })
  };

  return (
    <form>
      <h1>{country}</h1>
      <div className="form-group">
        <label htmlFor={companySelectId}>{"I want a travel package for:"}</label>
        <select id={companySelectId}
            className="country-details-select"
            name="select"
            onChange={updateCompany}
            value={countryDetails.details.company}>
          <option value={travelDetails.ALONE}>{"myself"}</option>
          <option value={travelDetails.PARTNER}>{"me and my partner"}</option>
          <option value={travelDetails.FAMILY}>{"my family"}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor={adventurousSelectId}>{"Will this holiday be adventurous?"}</label>
        <select id={adventurousSelectId}
            className="country-details-select"
            name="select"
            onChange={updateAdventurous}
            value={countryDetails.details.adventurous}>
          <option value="true">{"yes"}</option>
          <option value="false">{"no"}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor={luxuriousSelectId}>{"Will this holiday be luxurious?"}</label>
        <select id={luxuriousSelectId}
            className="country-details-select"
            name="select"
            onChange={updateLuxurious}
            value={countryDetails.details.luxurious}>
          <option value="true">{"yes"}</option>
          <option value="false">{"no"}</option>
        </select>
      </div>
      <div className="form-group form-inline">
        <label htmlFor={durationSpecId}>{"How many days are you staying for?"}</label>
        <input type="number"
            id={durationSpecId}
            className="country-details-select form-control"
            placeholder="days"
            onChange={updatePeriod}
            value={countryDetails.details.period} />
      </div>
    </form>
  );
}

export default CountryDetails;
