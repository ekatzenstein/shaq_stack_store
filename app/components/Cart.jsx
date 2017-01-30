import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Subheader from './Subheader'

export default class Cart extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      address: '',
      cart: [],
      promo: '',
      appliedPromo: '',
      discount: 0
    };

    // remember to bind actions
    this._purchaseSubmit = this._purchaseSubmit.bind(this);
    this._applyPromo = this._applyPromo.bind(this);
    this._onNameChange = this._onNameChange.bind(this);
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onAddressChange = this._onAddressChange.bind(this);
    this._onPromoChange = this._onPromoChange.bind(this);
    this._editQuantity = this._editQuantity.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
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
  componentDidMount(){
    //get cart data from database which is tied to session
    axios.get('/api/orders/cart')
    .then((res)=>{
      this.setState({cart:res.data});
      return axios.get('/api/orders/cart/promos');
    })
    .then((res) => {
      console.log('received promo code: ', res.data);
      this.setState({appliedPromo: res.data});
      if (!res.data)
        throw new Error('help');
      return axios.get('/api/promos/'+this.state.appliedPromo);
    })
    .then(res => res.data)
    .then(promo=> {
      const discountedProducts = promo.products;
      const newCart = this.state.cart;

      for (let i = 0; i < discountedProducts.length; i++)
      {
        let productId = discountedProducts[i].id;
        let index = this.state.cart.map(item => item.product.id).indexOf(productId);
        if (index !== -1) //found it
        {
          //newCart[index].cost -= promo.discount * newCart[index].cost
          newCart[index].discount = promo.discount;
        }
        // console.log('looking for product: ', productId, ' found@: ', index);
        // console.log('new cart: ', newCart);
      }
      //discountedProducts.map(discountedProduct => this.state.cart)
      this.setState({appliedPromo: promo.code, cart: newCart});
      return axios.post('/api/orders/cart/update', this.state.cart)

    })
    .catch(err=>console.error(err));
  }
  _purchaseSubmit(evt){
    evt.preventDefault();
    const _this=this;
    console.log('state: ',this.state);
    axios.post('/api/orders',{
      date: new Date(),
      address: this.state.address,
      email: this.state.email,
      status: 'Created',
      cart: this.state.cart
    })
    .then(()=> {
      return axios.post('/api/email', {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address
      });
    })
    .then(()=> { return axios.post('/api/orders/cart/empty')})
    .then((res)=> {
      console.log('res: ',res.data);
      _this._cartClear()
      browserHistory.push('/');
    });
  }

  _applyPromo(evt){
    evt.preventDefault();
    console.log('state: ',this.state);
    axios.get('/api/promos/'+this.state.promo)
    .then(res => res.data)
    .then(promo=> {
      console.log('promo ', promo);
      console.log('cart: ', this.state.cart)
      const discountedProducts = promo.products;
      const newCart = this.state.cart;

      for (let i = 0; i < discountedProducts.length; i++)
      {
        let productId = discountedProducts[i].id;
        let index = this.state.cart.map(item => item.product.id).indexOf(productId);
        if (index !== -1) //found it
        {
          //newCart[index].cost -= promo.discount * newCart[index].cost
          newCart[index].discount = promo.discount;
        }
        // console.log('looking for product: ', productId, ' found@: ', index);
        // console.log('new cart: ', newCart);
      }
      //discountedProducts.map(discountedProduct => this.state.cart)
      this.setState({appliedPromo: promo.code, cart: newCart});
      return axios.post('/api/orders/cart/update', this.state.cart)

    })
    .then(()=> axios.post('/api/orders/cart/promos/'+this.state.appliedPromo))
    .then(res => console.log(res.data))
    .catch(err=>console.log(err));;
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

  _onPromoChange(evt) {
    this.setState({ promo: evt.target.value, hasChange: true});
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

  _handleDelete(evt) {

    evt.preventDefault();
    const item_id = evt.target.id;
    const newCart = this.state.cart;

    if(item_id != -1) {
      newCart.splice(item_id, 1);
    }

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

    const discount = -this.state.cart.reduce((prev, curr) => {
      console.log('prev is: ',prev, 'curr: ', curr);
      var acc = curr.quantity * curr.product.current_price;
      if (curr.discount)
        acc *= curr.discount
      else
        acc = 0;
      return (prev + acc);
    },0).toFixed(2);

    //const discount = -((input.discount)*total).toFixed(2);

    const newTotal = (total + discount).toFixed(2);


    const promotions = (
      <div className="well">
        <form className="form-horizontal" onSubmit={this._applyPromo}>
          <fieldset>
            <legend>Promotions</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Promo Code</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange={this._onPromoChange} value={input.promo}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Apply Code</button>
              </div>
            </div>
          </fieldset>
        </form>

      </div>
      );
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
      if (item.discount)
        cost *= (1-item.discount);

      cost = cost.toFixed(2);
      console.log('cost is: ', cost);
      return (
        <TableRow key={item.id}>

        <TableRowColumn> <Link to={`/products/${product.id}`}>{product.title}</Link> </TableRowColumn>
        <TableRowColumn> {product.category.join(', ')} </TableRowColumn>
        <TableRowColumn> <img src={product.photo_url} width={"100px"} style={{padding:'5px'}} /></TableRowColumn>
        <TableRowColumn> ${product.current_price} </TableRowColumn>
        <TableRowColumn> {product.description} </TableRowColumn>
        <TableRowColumn> <input name="Quantity" id={item.id} value={item.quantity}  onChange={this._editQuantity} style={{width:'50px'}}/></TableRowColumn>
        <TableRowColumn> ${cost} </TableRowColumn>
        <TableRowColumn> <button id={`${item.id}`} onClick={this._handleDelete}>Delete</button></TableRowColumn>

        </TableRow>
      )
    });
    return (
      <div style={{width:'80%', margin:'0 auto'}}>



        <Subheader>cart</Subheader>
        {
          promotions
        }

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn> title </TableHeaderColumn>
              <TableHeaderColumn> category </TableHeaderColumn>
              <TableHeaderColumn> image </TableHeaderColumn>
              <TableHeaderColumn> price </TableHeaderColumn>
              <TableHeaderColumn> description </TableHeaderColumn>
              <TableHeaderColumn> quantity </TableHeaderColumn>
              <TableHeaderColumn> cost </TableHeaderColumn>
              <TableHeaderColumn> delete </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              cart
            }
          </TableBody>
        </Table>

        <br />

        Total: ${total}
        <br />

        Promo Code Applied: {this.state.appliedPromo}
        <br />

        Discount: ${discount}
        <br />
        New Total: ${newTotal}
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
