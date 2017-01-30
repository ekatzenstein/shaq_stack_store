import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Subheader from './Subheader'


const testArr = [
    {
        title: 'test'
    }
];

//we should probably  drop this in a util file
//http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
function compare(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

export default class Users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            currentUser: {},
            search: ''
        };
        this._searchUser = this._searchUser.bind(this)
        this._deleteUser = this._deleteUser.bind(this)
        this._promoteUser = this._promoteUser.bind(this)
    }
    static childContextTypes = {
        muiTheme: React.PropTypes.object
    }
    getChildContext()
    {
        return {muiTheme: getMuiTheme()}
    }
    componentDidMount() {
        axios.get(`/api/admin/users`).then(res => res.data).then(res => {
            this.setState({users: res.users.sort(compare), currentUser: res.currentUser});
        });

    }

    _searchUser(e) {
        this.setState({search: e.target.value.toLowerCase()})
    }
    _deleteUser(e, i) {
        e.preventDefault();
        const user = this.state.users[i]
        axios.delete(`/api/admin/users/${user.id}`).then(res => {
            const users = [...this.state.users]
            users.splice(i, 1);
            this.setState({users})
        })
    }
    _promoteUser(e, i) {
        e.preventDefault();
        const user = this.state.users[i];
        axios.put(`/api/admin/users/${user.id}`).then(res => {
            const users = [...this.state.users];
            const promoted_user = Object.assign({}, user, {isAdmin: true});
            users[i] = promoted_user;
            this.setState({users})
        })

    }

    render() {

        const users = this.state.users && this.state.users.filter(user => {
            //search user
            const stringArrayOfValues = Object.keys(user).map(key => user[key]);
            const condition1 = `${stringArrayOfValues.join('-')}`.toLowerCase().indexOf(this.state.search) !== -1;
            return condition1;
        }).map((user, i) => {
            return (
                <TableRow key={user.id}>
                    <TableRowColumn>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </TableRowColumn>
                    <TableRowColumn>
                        {user.id}
                    </TableRowColumn>
                    <TableRowColumn>
                        {user.email}
                    </TableRowColumn>
                    <TableRowColumn>
                        {user.isAdmin.toString()}
                    </TableRowColumn>
                    <TableRowColumn>
                        {user.created_at}
                    </TableRowColumn>
                    <TableRowColumn>
                        {user.updated_at}
                    </TableRowColumn>
                    <TableRowColumn>
                        {user.id !== this.state.currentUser.id
                            ? <button onClick={(event) => this._deleteUser(event, i)}>
                                    delete user</button>
                            : null}
                    </TableRowColumn>
                    <TableRowColumn>
                        {!user.isAdmin
                            ? <button onClick={(event) => this._promoteUser(event, i)}>
                                    promote user</button>
                            : null
}
                    </TableRowColumn>
                </TableRow>
            )
        });

        return (
            <div style={{
                width: '80%',
                margin: '0 auto'
            }}>

                <Subheader>users</Subheader>
                <br/>
                Search user name
                <input name="Search" onChange={this._searchUser} style={{
                    marginLeft: '20px'
                }}/>
                <br/>
                <br/>
                <br/>

                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                name
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                ID
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                email
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                admin
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                created
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                updated
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                delete
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                promote
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {users
}
                    </TableBody>
                </Table>

                <br/>
                <br/>
            </div>

        )
    }
}
