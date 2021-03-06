'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

import Header from './components/Header'

import Products from './components/Products';
import Product from './components/Product';

import Signup from './components/signUp'
import Cart from './components/Cart';
import ProductEdit from './components/ProductEdit';
import Orders from './components/Orders';
import Users from './components/Users';
import PromoSetup from './components/PromoSetup';


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        <Header user={user}/>
      </nav>
       {
         React.Children.map(children,(child)=>React.cloneElement(child,{isAdmin:user&&user.isAdmin, user:user}))
       }

    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/products" />
        <Route path="/products" component={Products} />
        <Route path="/products/:productId" component={Product}/>
        <Route path="/products/:productId/edit" component={ProductEdit} />
        <Route path="/signup" component={Signup}/>
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
        <Route path="/users" component={Users} />
        <Route path="/promosetup" component={PromoSetup} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
