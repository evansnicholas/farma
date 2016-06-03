import { connect } from "react-redux";
import CountrySelector from "../components/CountrySelector";
import {addCountry} from "../actions"

const mapStateToProps = (state) => {
  return state.countries;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMapClick: (country) => {
      dispatch(addCountry(country))
    }
  }
}

const CountrySelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelector)

export default CountrySelection;
