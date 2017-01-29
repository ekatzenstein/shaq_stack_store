import React from 'react';

import Login from './Login'
import WhoAmI from './WhoAmI'

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const style={
  sb:{
      paddingLeft: '5%',
      paddingRight: '40px',
      paddingTop: '24px',
      paddingBottom: '24px'
  },
  cb:{
      paddingRight: '30px',
      paddingTop: '24px',
      paddingBottom: '24px'
  }
}

const Options = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

const HeaderOptions = (props) => (
  <table>
      <tbody>
          <tr>
              <td className='header' style={style.sb}>
              {props.user ? <WhoAmI/> : <Login/>}
              </td>
              <td className='header' style={style.cb}>
              <Options/>
              </td>
          </tr>
      </tbody>
  </table>
)
// <span>

// {this.props.user ? <WhoAmI/> : <Login/>}
// <Logged/>
// </span>
export default HeaderOptions;
