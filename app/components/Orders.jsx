import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';

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
          <tr key={order.id}>

          <td> <Link to={`/orders/${order.id}`}>{order.id}</Link> </td>
          <td> {order.address} </td>
          <td> {order.created_at} </td>
          <td> {order.updated_at} </td>
          <td> {order.email} </td>
          <td> {order.id} </td>
          <td>
            <select name='status' value = {order.status} onChange={(e)=>this._categoryChange(e,i)}>
              {['Created', 'Processing', 'Cancelled', 'Completed'].map(status=>{
                return <option key={status} value={status}>{status}</option>
              })}
            </select>
           </td>
           <td><button onClick={(e)=>{this._saveUpdates(e,i)}}>Save</button></td>

          </tr>
        )
      });

    return (
      <div >
        <br />
        Search order:
        <input name="Search" onChange={this._searchOrder} />
        <br />

        <h1>ORDERS</h1>
        <table>
          <tbody>
        <tr>
        <th> order ID </th>
        <th> address </th>
        <th> created </th>
        <th> updated </th>
        <th> email </th>
        <th> user ID </th>
        <th> status </th>

        </tr>
        {
          orders
        }
        </tbody>
        </table>
        <br />
        <br />

      </div>

    )
  }
}
