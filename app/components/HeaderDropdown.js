import React from 'react';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
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
    const fontStyle={fontFamily:'pacfont'};
    return (
      <IconMenu
        iconButtonElement={
          <IconButton style={{width:'60px', height:'60px', marginTop:'0px'}} iconStyle={{width:'40px', height:'40px'}}><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        >
        <MenuItem style={fontStyle} primaryText="Products" onClick={()=>browserHistory.push('/')}/>
        <MenuItem style={fontStyle} primaryText="Cart" onClick={()=>browserHistory.push('/cart')}/>
        {this.props.user?<Divider/>:null}
        {this.props.user?<MenuItem style={fontStyle} primaryText="Orders" onClick={()=>browserHistory.push('/orders')}/>:null}
        {this.props.user?<MenuItem style={fontStyle} primaryText="Users" onClick={()=>browserHistory.push('/users')}/>:null}
        {this.props.user?<MenuItem style={fontStyle} primaryText="Promos" onClick={()=>browserHistory.push('/promosetup')}/>:null}
        <Divider/>
        <MenuItem style={fontStyle} primaryText={this.props.user?"Logout":"Login"} onClick={()=>{
            this.props.user?this.props.logOut():this.props.openLogin();
          }}/>
      </IconMenu>
    );
  }
}
