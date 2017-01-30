import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import axios from 'axios';
import Subheader from './Subheader';

const testArr = [{title: 'test'}];
export default class Orders extends Component {

  constructor() {
    super();
    this.state = {
      orders: [],
      search:''
    };
    this._searchOrder=this._searchOrder.bind(this)
    this._saveUpdates=this._saveUpdates.bind(this)
    this._categoryChange=this._categoryChange.bind(this)
  }
  static childContextTypes =
    {
        muiTheme: React.PropTypes.object
    }
  getChildContext()
  {
      return {
          muiTheme: getMuiTheme()
      }
  }
  componentDidMount() {
   axios.get(`/api/admin/orders`)
   .then(res => res.data)
   .then( orders => {
     console.log(orders)
    this.setState({orders});
   });

  }

  _searchOrder(e){
    this.setState({search:e.target.value.toLowerCase()})
  }
  _saveUpdates(e,i){
    e.preventDefault();
    const order = this.state.orders[i];
    const id = order.id
    axios.put(`/api/admin/orders/${order.id}`,order)
      .then(res => {
      }).catch(err=>console.log(err));

  }
  _categoryChange(e,i){
    e.preventDefault();
    const orders = [...this.state.orders];
    const order = orders[i];
    const order_changed = Object.assign({},order,{status:e.target.value});
    orders[i]=order_changed;
    this.setState({orders})
  }


  handleClick(evt) {

    // evt.preventDefault();
    // console.log('buy order: ', evt.target.id);
    // const order_id = evt.target.id;
    // axios.post('/api/orders/cart/', {
    //   order_id: order_id*1,
    //   quantity: 1
    // })
    // .then(res => {
    //   console.log(res.data);
    // })
    // .catch(err=> console.log(err));
  }


  render() {
    console.log(this.state.orders)
    const orders =
      this.state.orders &&
      this.state.orders
      .filter(order=>{
        //search order
        const stringArrayOfValues=Object.keys(order).map(key=>order[key]);
        const condition1 = `${stringArrayOfValues.join('-')}`.toLowerCase().indexOf(this.state.search)!==-1;
        return condition1;
      })
      .map((order,i) =>
      {
        return (
          <TableRow key={order.id}>

          <TableRowColumn>{order.id} </TableRowColumn>
          <TableRowColumn> {order.address} </TableRowColumn>
          <TableRowColumn> {order.created_at} </TableRowColumn>
          <TableRowColumn> {order.updated_at} </TableRowColumn>
          <TableRowColumn> {order.email} </TableRowColumn>
          <TableRowColumn> {order.user_id || 'No ID'} </TableRowColumn>
          <TableRowColumn>
            <select name='status' value = {order.status} onChange={(e)=>this._categoryChange(e,i)}>
              {['Created', 'Processing', 'Cancelled', 'Completed'].map(status=>{
                return <option key={status} value={status}>{status}</option>
              })}
            </select>
          </TableRowColumn>
           <TableRowColumn><button onClick={(e)=>{this._saveUpdates(e,i)}}>Save</button></TableRowColumn>

          </TableRow>
        )
      });

    return (
      <div style={{width:'80%',margin:'0 auto'}}>
        <Subheader>orders</Subheader>
        <br />
        Search order
        <input name="Search" onChange={this._searchOrder} style={{marginLeft:'20px'}}/>
        <br />
        <br />
        <br />

        <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableHeaderColumn> order ID </TableHeaderColumn>
              <TableHeaderColumn> address </TableHeaderColumn>
              <TableHeaderColumn> created </TableHeaderColumn>
              <TableHeaderColumn> updated </TableHeaderColumn>
              <TableHeaderColumn> email </TableHeaderColumn>
              <TableHeaderColumn> user ID </TableHeaderColumn>
              <TableHeaderColumn> status </TableHeaderColumn>
              <TableHeaderColumn> save updates </TableHeaderColumn>

            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {
              orders
            }
        </TableBody>
      </Table>
        <br />
        <br />

      </div>

    )
  }
}
