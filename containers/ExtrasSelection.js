import { connect } from "react-redux";
import ExtrasSelector from "../components/ExtrasSelector";

const mapStateToProps = (state) => {
  return {
    extras: state.extras
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

const ExtrasSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtrasSelector);

export default ExtrasSelection;
