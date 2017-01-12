import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';

import Products from './Products';

const orderInfo = (
  <div className="well">
    <form className="form-horizontal" onSubmit={this._purchaseSubmit}>
      <fieldset>
        <legend>New Order</legend>
        <div className="form-group">
          <label className="col-xs-2 control-label">Name</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this._onNameChange} value={input.name}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2 control-label">Shipping Address</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this._onAddressChange} value={input.address}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2 control-label">E-mail</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this._onEmailChange} value={input.email}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-10 col-xs-offset-2">
            <button type="submit" className="btn btn-success">BUY!!</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
);


export default class Admin extends Component {

  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
  }

  render() {

    return (
      <div>
        <Products/>
        {orderInfo}
      </div>
    )
  }
}
