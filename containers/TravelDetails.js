import { connect } from "react-redux";
import TravelDetailsUpdator from "../components/TravelDetailsUpdator";
import { updateCountryTravelDetails } from "../actions";

const mapStateToProps = (state) => {
  return { countries: state.countries };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCountryTravelDetails: (details) => {
      dispatch(updateCountryTravelDetails(details))
    }
  }
}

const TravelDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelDetailsUpdator);

export default TravelDetails;
