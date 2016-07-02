import React from "react";

const SelectedCountry = ({
  country,
  onRemoveCountry,
  onUpdateCountryTravelDetails
}) => {
  const countryAdultsId = `${country.country}adults`;
  const countryChildrenId = `${country.country}children`;
  const countryDaysId = `${country.country}days`

  const updateAdults = (event) => {
    onUpdateCountryTravelDetails({
      country: country.country,
      data: {
        adults: event.target.value
      }
    })
  };

  const updateChildren = (event) => {
    onUpdateCountryTravelDetails({
      country: country.country,
      data: {
        children: event.target.value
      }
    })
  };

  const updatePeriod = (event) => {
    onUpdateCountryTravelDetails({
      country: country.country,
      data: {
        period: event.target.value
      }
    })
  };

  return (
    <div className="selected-country">
      <div className="row">
        <div className="col-xs-10">
          <p className="lead selected-country-name">
             {country.country}
          </p>
        </div>
        <div className="col-xs-2">
          <button type="button" className="close"
            aria-label="Close"
            onClick={() => onRemoveCountry(country.country)}>
            <span aria-hidden="true">{"\u00d7"}</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <form className="form-horizontal country-details-form">
            <div className="form-group form-inline country-details">
              <label htmlFor={countryAdultsId}>{"Adults:"}</label>
              <input type="number"
                  id={countryAdultsId}
                  className="country-detail"
                  onChange={updateAdults}
                  value={country.details.adults} />
              <label htmlFor={countryChildrenId}>{"Children:"}</label>
              <input type="number"
                  id={countryChildrenId}
                  className="country-detail"
                  onChange={updateChildren}
                  value={country.details.children} />
              <label htmlFor={countryDaysId}>{"Days:"}</label>
              <input type="number"
                  id={countryDaysId}
                  className="country-detail"
                  onChange={updatePeriod}
                  value={country.details.period} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SelectedCountry;
