import React from 'react';
import {Link} from 'react-router';

export const Header = ({ user, logout }) => (
  <div>
    <Link to='/products'>Products</Link>
    <br/>
    <Link to='/cart'>Cart</Link>
    <br/>
    {(user && user.isAdmin) ? <Link to='/orders'>Orders</Link> : null}
    <br/>
    {(user && user.isAdmin) ? <Link to='/users'>Users</Link> : null}
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (Header)
