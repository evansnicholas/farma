import React from "react";
import {Link} from "react-router";

export default class DeliveryDetailsForm extends React.Component {
  getDisplayName() {
    return "DeliveryDetailsForm";
  }

  constructor(props) {
    super(props);
    this.navigateToOrderSummary = this.navigateToOrderSummary.bind(this);
    this.navigateToOrderConfirmation = this.navigateToOrderConfirmation.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  navigateToOrderSummary() {
    this.context.router.push("/orderSummary");
  }

  navigateToOrderConfirmation() {
    this.props.onSubmitOrder(this.props.order);
    this.context.router.push("/deliveryConfirmation");
  }

  updateForm(event, fieldName) {
    this.props.onUpdateDeliveryDetails(
      {[fieldName]: event.target.value}
    );
  }

  renderForm() {
    return (
      <form>
        <h2>{"Order Details"}</h2>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
            value={this.props.order.email}
            onChange={e => this.updateForm(e, "email")} />
        </div>
        <div className="form-group">
          <label htmlFor="inputFirstName">First name</label>
          <input type="string"
            className="form-control"
            id="inputFirstName"
            placeholder="First name"
            value={this.props.order.firstName}
            onChange={e => this.updateForm(e, "firstName")} />
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName">Last name</label>
          <input type="string"
            className="form-control"
            id="inputLastName"
            placeholder="Last name"
            value={this.props.order.lastName}
            onChange={e => this.updateForm(e, "lastName")} />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input type="string"
            className="form-control"
            id="inputAddress"
            placeholder="Address"
            value={this.props.order.address}
            onChange={e => this.updateForm(e, "address")} />
        </div>
        <div className="form-group">
          <label htmlFor="inputPostcode">Postcode</label>
          <input type="string"
            className="form-control"
            id="inputPostcode"
            placeholder="Postcode"
            value={this.props.order.postcode}
            onChange={e => this.updateForm(e, "postcode")} />
        </div>
        <div className="form-group">
          <label htmlFor="inputCity">City</label>
          <input type="string"
            className="form-control"
            id="inputCity"
            placeholder="City"
            value={this.props.order.city}
            onChange={e => this.updateForm(e, "city")} />
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="container" id="delivery-details-form">
        <div className="row farma-nav">
          <button className={`btn btn-default pull-left`}
            type="submit"
            onClick={() => {
              this.navigateToOrderSummary()
            }}>
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              {"Order Summary"}
          </button>
          <button className={`btn btn-default pull-right`}
            type="submit"
            onClick={() => {
              this.navigateToOrderConfirmation()
            }}>
              {"Place Order"}
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </button>
        </div>
        <div className="row">
          <div className="col-xs-9 col-xs-offset-1">
            {this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}

DeliveryDetailsForm.contextTypes = {
  router: React.PropTypes.object
}

export default DeliveryDetailsForm;
