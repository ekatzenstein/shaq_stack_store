import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';

import Product from './Product';

const orderInfo = (
  <div className="well">
    <form className="form-horizontal">
      <fieldset>
        <legend>Edit Product</legend>
        <div className="form-group">
          <label className="col-xs-2 control-label">Name</label>
          <div className="col-xs-10">
            <input className="form-control" type="text"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2 control-label">Description</label>
          <div className="col-xs-10">
            <input className="form-control" type="text"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2 control-label">Other Information</label>
          <div className="col-xs-10">
            <input className="form-control" type="text"/>
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
      product:{}
    };
  }
  componentDidMount() {
   //this.nextJoke()
   console.log(this.props)
   axios.get(`/api/admin/products/${this.props.routeParams.productId}`)
   .then(res => res.data)
   .then( product => {
    this.setState({product});
   });
  }

  render() {
    console.log(this.state)
    return (
      <div>
      {orderInfo}
      </div>
    )
  }
}
