import React from 'react';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class HeaderDropdown extends React.Component {    

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        >
        <MenuItem primaryText="Products" onClick={()=>browserHistory.push('/')}/>
        <MenuItem primaryText="Cart" onClick={()=>browserHistory.push('/cart')}/>
        <MenuItem primaryText={this.props.user?"Logout":"Login"} onClick={()=>{
            this.props.user?this.props.logOut():this.props.openLogin();
          }}/>
      </IconMenu>
    );
  }
}
