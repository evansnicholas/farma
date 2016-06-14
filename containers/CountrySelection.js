import { connect } from "react-redux";
import CountrySelector from "../components/CountrySelector";
import {addCountry, removeCountry} from "../actions";

const mapStateToProps = (state) => {
  return state.countries;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCountry: (country) => {
      dispatch(addCountry(country))
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
