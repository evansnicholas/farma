import React from "react";

const CountryDetails = ({country}) => {
  const companySelectId = `${country}CompanySelect`;
  const adventurousSelectId = `${country}AdventurousSelect`;
  const luxuriousSelectId = `${country}LuxuriousSelect`;
  const durationSpecId = `${country}DurationSpec`;
  return (
    <form>
      <h1>{country}</h1>
      <div className="form-group">
        <label htmlFor={companySelectId}>{"I want a travel package for:"}</label>
        <select id={companySelectId} className="country-details-select" name="select">
          <option value="alone">{"myself"}</option>
          <option value="partner">{"me and my partner"}</option>
          <option value="family">{"my family"}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor={adventurousSelectId}>{"Will this holiday be adventurous?"}</label>
        <select id={adventurousSelectId} className="country-details-select" name="select">
          <option value="yes">{"yes"}</option>
          <option value="no">{"no"}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor={luxuriousSelectId}>{"Will this holiday be luxurious?"}</label>
        <select id={luxuriousSelectId} className="country-details-select" name="select">
          <option value="yes">{"yes"}</option>
          <option value="no">{"no"}</option>
        </select>
      </div>
      <div className="form-group form-inline">
        <label htmlFor={durationSpecId}>{"How many days are you staying for?"}</label>
        <input type="number"
            id={durationSpecId}
            className="country-details-select form-control"
            placeholder="days" />
      </div>
    </form>
  );
}

export default CountryDetails;
