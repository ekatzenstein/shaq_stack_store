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
    this._changeCode=this._changeCode.bind(this)
    this._changeDiscount=this._changeDiscount.bind(this)
    this._saveCode=this._saveCode.bind(this)
  }
  
  componentDidMount() {
   axios.get(`/api/promos`)
   .then(res => res.data)
   .then( codes => {
     console.log('existing codes: ', codes)
    this.setState({existingcodes: codes});
   })
   .catch(err=>console.log(err));

  }

  _changeCode(e){
    this.setState({promocode:e.target.value})
  }

  _changeDiscount(e){
    this.setState({discount:e.target.value})
  }

  _saveCode(e){
    e.preventDefault();
    
    axios.post(`/api/promos/`,{
      code: this.state.promocode,
      discount: this.state.discount
    })
    .then(res => { 
      console.log('res is: ', res);
      this.setState({existingcodes: [...this.state.existingcodes, res.data]});
    })
    .catch(err=>console.log(err));

  }



  render() {

    const existingcodes =
      this.state.existingcodes
      .map((code,i) =>
      {
        return (
          <tr key={i}>

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
        <button onClick={this._saveCode}> Save </button>
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
