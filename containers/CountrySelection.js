import { connect } from "react-redux";
import CountrySelector from "../components/CountrySelector";
import {
  fetchCountry,
  removeCountry,
  updateCountryTravelDetails
} from "../actions";

const mapStateToProps = (state) => {
  return { countries: state.data.countries };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCountry: (country) => {
      dispatch(fetchCountry(country))
    },
    onRemoveCountry: (country) => {
      dispatch(removeCountry(country))
    },
    onUpdateCountryTravelDetails: (details) => {
      dispatch(updateCountryTravelDetails(details))
    }
  }
}

const CountrySelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelector);

export default CountrySelection;
