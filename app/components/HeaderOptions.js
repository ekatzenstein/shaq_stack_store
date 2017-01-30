import React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

import {logout} from 'APP/app/reducers/auth';
import {login} from 'APP/app/reducers/auth';

import HeaderDropdown from './HeaderDropdown'

const style = {
    sb: {
        paddingLeft: '5%',
        paddingRight: '40px',
        paddingTop: '24px',
        paddingBottom: '24px',
        fontFamily: 'pacfont'
    },
    cb: {
        paddingRight: '30px',
        paddingTop: '24px',
        paddingBottom: '24px',
        fontFamily: 'pacfont',
        fontSize: '20px'
    }
}

// const Options = (props) => (
//
// );

class HeaderOptions extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            loginName: '',
            loginPassword: ''
        }
        this._openLogin = this._openLogin.bind(this);
        this._closeLogin = this._closeLogin.bind(this);
        this._logIn = this._logIn.bind(this);
        this._logOut = this._logOut.bind(this);
        this._name = this._name.bind(this);
        this._password = this._password.bind(this);
    }
    _name(event) {
        this.setState({loginName: event.target.value})
    }
    _password(event) {
        this.setState({loginPassword: event.target.value})
    }
    _logIn() {
        this.props.login(this.state.loginName, this.state.loginPassword);
        this.setState({open: false})
    }
    _logOut() {
        this.props.logout();
    }
    _openLogin() {
        this.setState({open: true})
    }
    _closeLogin() {
        this.setState({open: false})
    }
    render() {
        const actions = [ < FlatButton label = "Cancel" primary = {
                true
            }
            onTouchTap = {
                this._closeLogin
            } />, < FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onTouchTap = {
                this._logIn
            } />
        ];

        return (
            <div>
                <Dialog title="Login" modal={false} actions={actions} open={this.state.open} onRequestClose={() => {
                    console.log('alksndf')
                }}>
                    <TextField hintText="user name" onChange={this._name}/><br/>
                    <TextField hintText="password" onChange={this._password}/>
                </Dialog>
                <table>
                    <tbody>
                        <tr>
                            <td className='header' style={style.cb}>
                                {this.props.user
                                    ? this.props.user.name
                                    : null}
                            </td>
                            <td className='header' style={style.cb}>
                                <IconButton
                                    style={{width: '60px',height: '60px',marginTop: '0px'}}
                                    iconStyle={{width: '40px',height: '40px'}}>
                                    <ShoppingCart onClick={() => browserHistory.push('/cart')}/>
                                </IconButton>
                            </td>
                            <td className='header' style={style.cb}>
                                <HeaderDropdown openLogin={this._openLogin} logIn={this._logIn} logOut={this._logOut} user={this.props.user}/>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(({auth}) => ({user: auth}), {
    logout,
    login
},)(HeaderOptions)
