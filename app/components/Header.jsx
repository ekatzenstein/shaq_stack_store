import React from 'react';
import {Link} from 'react-router';



import Tabs from './Tabs';
import HeaderOptions from './HeaderOptions';

import AppBar from 'material-ui/AppBar';


import getMuiTheme from 'material-ui/styles/getMuiTheme'

//material-ui requirements
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();





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
    const user = this.props.user;
    const logout = this.props.logout;
    // console.log(this.props)
    return(
      <div>
        <AppBar
          titleStyle={{height:'100%'}}
          zDepth={2}
          title={<span style={{lineHeight:'100px'}}><Link to='/' style={styles.title}>shaq stack store</Link></span>}
          showMenuIconButton={false}
          iconElementRight={(
          <HeaderOptions user={this.props.user}/>
        )}

          style={{background:'white'}}
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
    textDecoration:'none',
    fontFamily:'pacfont',
    color:'black',
    fontSize:'4vw',
    overflow:'hidden'
  },
};
