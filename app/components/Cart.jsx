import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';

const products = 
  [
    {product_id: 1, title: 'Hats', category: ['Clothes','Accessories'], current_price: 16, description: 'Fedora with a feather', availability: true, inventory: 100},
    {product_id: 2, title: 'Ski Suits', category: ['Athletics', 'Clothes'], current_price: 11, description: 'Full body ski suit', availability: false, inventory: 5},
    {product_id: 3, title: 'Fanny Pack', category: ['Accessories'], current_price: 12, description: 'Bright neon in all colors', availability: true, inventory: 64},
    {product_id: 4, title: 'Chuck Taylors', category: ['Clothes','Shoes'], current_price: 15, description: 'A variation on a classsic', availability: false, inventory: 35},
    {product_id: 5, title: 'Hairspray', category: ['Beauty'], current_price: 41, description: 'Fulll of CFCs', availability: true, inventory: 22},
    {product_id: 6, title: 'Socks', category: ['Clothes'], current_price: 51, description: 'Big wooly socks', availability: true, inventory: 21},
    {product_id: 7, title: 'Wigs', category: ['Accessories', 'Beauty'], current_price: 21, description: 'Business in the front, party in the back', availability: false, inventory: 100}
  ];

const items = products.map((product,i) => ({id: i, product: product, quantity: 1, cost: product.current_price}));


export default class Cart extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      address: '',
      cart: items
    };
    // remember to bind actions
    this._purchaseSubmit = this._purchaseSubmit.bind(this);
    this._onNameChange = this._onNameChange.bind(this);
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onAddressChange = this._onAddressChange.bind(this);
  }
  // componentDidMount() {
  //  //this.nextJoke()
  //  axios.get('/api/products')
  //  .then(res => res.data)
  //  .then( products => {
  //   this.setState({products: products});
  //  });

  // }

  _purchaseSubmit(evt){
    evt.preventDefault();
    console.log('state: ',this.state);
    axios.post('/api/orders',{
      date: new Date(),
      address: this.state.address,
      email: this.state.email,
      status: 'Created',
      cart: this.state.cart
    })
    .then((res)=> console.log('res: ',res.data));
  }
  
  _onNameChange(evt) {
    this.setState({ name: evt.target.value, hasChange: true});
  }
  _onEmailChange(evt) {
    this.setState({ email: evt.target.value, hasChange: true});
  }
  _onAddressChange(evt) {
    this.setState({ address: evt.target.value, hasChange: true});
  }


  render() {

    const input = this.state;
    const total = this.state.cart.reduce((prev, curr) => {
      console.log('prev is: ',prev, 'curr: ', curr);
      return (prev + curr.cost);
    },0); 

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

    const cart = this.state.cart && this.state.cart.map(item => {
      var product = item.product;
      return (
        <tr key={item.id}>

        <td> <Link to={`/products/${product.id}`}>{product.title}</Link> </td>
        <td> {product.category.join(', ')} </td>
        <td> {product.photo_url} </td>
        <td> {product.current_price} </td>
        <td> {product.description} </td>
        <td> {item.quantity} </td>
        <td> {item.cost} </td>

        </tr>
      )
    });
    return (
      <div >



        <h1>CART</h1>
        <table>
          <tbody>
        <tr>
        <th> title </th>
        <th> category </th>
        <th> photo_url </th>
        <th> current_price </th>
        <th> description </th>
        <th> quantity </th>
        <th> cost </th>


        </tr>
        {
          cart
        }
        
        </tbody>
        </table>
        <br />
        Total: {total}
        <br />
        {
          orderInfo
        }
        
        
      </div>
    )
  }
}