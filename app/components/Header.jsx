import React from 'react';
import {Link} from 'react-router';

import Login from './Login'
import WhoAmI from './WhoAmI'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import getMuiTheme from 'material-ui/styles/getMuiTheme'



class Header extends React.Component {


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

  render(){
    console.log(this)
    const user = this.props.user;
    const logout = this.props.logout;
    // console.log(this.props)
    return(
      <div>
        <AppBar
          title={<span style={styles.title}>shaq_stack_store</span>}
          onTitleTouchTap={handleTouchTap}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={this.props.user ? <WhoAmI/> : <Login/>}
          style={{background:'red'}}
        />

        <div>
          <Link to='/products'>Products</Link>
          <br/>
          <Link to='/cart'>Cart</Link>
          <br/>
          {(user && user.isAdmin) ? <Link to='/orders'>Orders</Link> : null}
          <br/>
          {(user && user.isAdmin) ? <Link to='/users'>Users</Link> : null}
        </div>


      </div>
    )
  }
}

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (Header)


function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};
