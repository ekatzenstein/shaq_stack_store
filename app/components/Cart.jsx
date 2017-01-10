import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';



// const products =
//   [
//     {product_id: 1, title: 'Hats', category: ['Clothes','Accessories'], current_price: 16, description: 'Fedora with a feather', availability: true, inventory: 100}
//     // {product_id: 2, title: 'Ski Suits', category: ['Athletics', 'Clothes'], current_price: 11, description: 'Full body ski suit', availability: false, inventory: 5},
//     // {product_id: 3, title: 'Fanny Pack', category: ['Accessories'], current_price: 12, description: 'Bright neon in all colors', availability: true, inventory: 64},
//     // {product_id: 4, title: 'Chuck Taylors', category: ['Clothes','Shoes'], current_price: 15, description: 'A variation on a classsic', availability: false, inventory: 35},
//     // {product_id: 5, title: 'Hairspray', category: ['Beauty'], current_price: 41, description: 'Fulll of CFCs', availability: true, inventory: 22},
//     // {product_id: 6, title: 'Socks', category: ['Clothes'], current_price: 51, description: 'Big wooly socks', availability: true, inventory: 21},
//     // {product_id: 7, title: 'Wigs', category: ['Accessories', 'Beauty'], current_price: 21, description: 'Business in the front, party in the back', availability: false, inventory: 100}
//   ];
//
// const items = products.map((product,i) => ({id: i, product: product, quantity: 1, cost: product.current_price}));


export default class Cart extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      address: '',
      cart: []
    };

    // remember to bind actions
    this._purchaseSubmit = this._purchaseSubmit.bind(this);
    this._onNameChange = this._onNameChange.bind(this);
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onAddressChange = this._onAddressChange.bind(this);
    this._editQuantity = this._editQuantity.bind(this);
  }

  componentDidMount(){
    //get cart data from database which is tied to session
    axios.get('/api/orders/cart').then((res)=>{this.setState({cart:res.data})})
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
    .then(()=> { return axios.post('/api/orders/cart/empty')})
    .then((res)=> {
      console.log('res: ',res.data);
      this.setState({});
      browserHistory.push('/');
    });
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

  _cartClear(evt) {
    evt.preventDefault();

    axios.post('/api/orders/cart/empty')
    .then(res => {
      browserHistory.push('/')
      console.log(res.data);
    })
    .catch(err=> console.log(err));
  }

  _keepShopping(evt) {
    evt.preventDefault();

    
    browserHistory.push('/');
      
  }

  _editQuantity(evt) {

    evt.preventDefault();
    const item_id = evt.target.id;
    const newVal = evt.target.value*1;
    console.log('item: ', item_id, ' update to: ', newVal);

    const newCart = this.state.cart;
    newCart[item_id].quantity = newVal;
    this.setState({ cart: newCart});

    axios.post('/api/orders/cart/update', this.state.cart)
    .then(res => console.log(res.data))
    .catch(err=>console.log(err));
  }

  render() {

    const input = this.state;
    const total = this.state.cart.reduce((prev, curr) => {
      console.log('prev is: ',prev, 'curr: ', curr);
      return (prev + curr.quantity * curr.product.current_price);
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
      var cost = item.quantity * product.current_price;
      console.log('cost is: ', cost);
      return (
        <tr key={item.id}>

        <td> <Link to={`/products/${product.id}`}>{product.title}</Link> </td>
        <td> {product.category.join(', ')} </td>
        <td> {product.photo_url} </td>
        <td> {product.current_price} </td>
        <td> {product.description} </td>
        <td> <input name="Quantity" id={item.id} value={item.quantity}  onChange={this._editQuantity} /></td>
        <td> {cost} </td>

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
        <br />
        <button type="submit" className="btn btn-success" onClick={this._cartClear}>Clear Cart</button>
        <button type="submit" className="btn btn-success" onClick={this._keepShopping}>Keep Shopping</button>
        <br />
        <br />
        {
          orderInfo
        }


      </div>
    )
  }
}
