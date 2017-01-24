import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';

const testArr = [{title: 'test'}];
export default class PromoSetup extends Component {

  constructor() {
    super();
    this.state = {
      existingcodes: [],
      promocode: '',
      discount: 0
    };
    // this._searchOrder=this._searchOrder.bind(this)
    // this._saveUpdates=this._saveUpdates.bind(this)
    // this._categoryChange=this._categoryChange.bind(this)
  }
  
  componentDidMount() {
   axios.get(`/api/admin/promos`)
   .then(res => res.data)
   .then( codes => {
     console.log(codes)
    this.setState({existingcodes: codes});
   });

  }

  _changeCode(e){
    this.setState({promocode:e.target.value})
  }

  _changeDiscount(e){
    this.setState({discount:e.target.value})
  }

  _saveCode(e){
    e.preventDefault();
    
    axios.put(`/api/admin/promos/`,this.state)
      .then(res => {
      }).catch(err=>console.log(err));

  }



  render() {

    const existingcodes =
      this.state.existingcodes
      .map((code,i) =>
      {
        return (
          <tr key={code}>

          <td> {code.code}</td>
          <td> {code.discount} </td>
          </tr>
        )
      });

    return (
      <div >
        <br />
        New Code:
        <input name="Code" onChange={this._changeCode} />
        <br />

        New Discount:
        <input name="Discount" onChange={this._changeDiscount} />
        <br />

        <h1>Existing Codes</h1>
        <table>
          <tbody>
        <tr>
        <th> code </th>
        <th> discount </th>

        </tr>
        {
          existingcodes
        }
        </tbody>
        </table>
        <br />
        <br />

      </div>

    )
  }
}
