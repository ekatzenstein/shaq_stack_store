import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';

import Subheader from './Subheader';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

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

  static childContextTypes = {
        muiTheme: React.PropTypes.object
    }

  getChildContext(){
      return {muiTheme: getMuiTheme()}
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
          <TableRow key={i}>

          <TableRowColumn> {code.code}</TableRowColumn>
          <TableRowColumn> {code.discount} </TableRowColumn>
          </TableRow>
        )
      });

    return (
      <div style={{width:'80%', margin:'0 auto'}}>
        <Subheader>promos</Subheader>

        <input name="Code" onChange={this._changeCode} />  New Code
        <br />
        <br />

        <input name="Discount" onChange={this._changeDiscount} />  New Discount
        <br />
        <br />
        <br />
        <button onClick={this._saveCode}> Save </button>
        <br />
        <br />
        <Subheader>existing promos</Subheader>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
            <TableHeaderColumn> code </TableHeaderColumn>
            <TableHeaderColumn> discount </TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            existingcodes
          }
          </TableBody>
      </Table>
        <br />
        <br />

      </div>

    )
  }
}
