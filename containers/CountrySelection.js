import { connect } from "react-redux";
import CountrySelector from "../components/CountrySelector";
import {fetchCountry, removeCountry} from "../actions";

const mapStateToProps = (state) => {
  return state.countries;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCountry: (country) => {
      dispatch(fetchCountry(country))
    },
    onRemoveCountry: (country) => {
      dispatch(removeCountry(country))
    }
  }
}

const CountrySelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelector);

export default CountrySelection;
