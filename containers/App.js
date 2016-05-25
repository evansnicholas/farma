import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as FarmaActions from "../actions"

class App extends Component {
  render() {
    const { countries, actions } = this.props
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-10 col-xs-offset-2">
            <h4>{"Click on the map to select your destination:"}</h4>
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  countries: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    countries: state.countries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FarmaActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
