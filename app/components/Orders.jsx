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
      .map(order =>
      {
        return (
          <tr key={order.id}>

          <td> <Link to={`/orders/${order.id}`}>{order.id}</Link> </td>
          <td> {order.address} </td>
          <td> {order.created_at} </td>
          <td> {order.updated_at} </td>
          <td> {order.email} </td>
          <td> {order.userId} </td>
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
        <th> date </th>
        <th> email </th>
        <th> user ID </th>

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
