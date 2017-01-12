'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

import Products from './components/Products';
import Product from './components/Product';

import Signup from './components/signUp'
import Cart from './components/Cart';
import Admin from './components/Admin';


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {React.Children.map(children,(child)=>React.cloneElement(child,{isAdmin:user&&user.isAdmin}))}
      {
        //children //this was replace with react.children.map above to add an 'isAdmin' prop to every page load
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
        <Route path="/signup" component={Signup}/>
        <Route path="/cart" component={Cart} />
        <Route path="/admin" component={Admin} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
