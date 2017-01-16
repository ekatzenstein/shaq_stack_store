import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';

const testArr = [{title: 'test'}];
export default class Users extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      search:''
    };
    this._searchUser=this._searchUser.bind(this)
  }
  componentDidMount() {
   axios.get(`/api/admin/users`)
   .then(res => res.data)
   .then( users => {
    this.setState({users});
   });

  }

  _searchUser(e){
    this.setState({search:e.target.value.toLowerCase()})
  }

  handleClick(evt) {

    // evt.preventDefault();
      // console.log('buy user: ', evt.target.id);
    // const user_id = evt.target.id;
    // axios.post('/api/users/cart/', {
    //   user_id: user_id*1,
    //   quantity: 1
    // })
    // .then(res => {
    //   console.log(res.data);
    // })
    // .catch(err=> console.log(err));
  }


  render() {

    const users =
      this.state.users &&
      this.state.users
      .filter(user=>{
        //search user
        const stringArrayOfValues=Object.keys(user).map(key=>user[key]);
        const condition1 = `${stringArrayOfValues.join('-')}`.toLowerCase().indexOf(this.state.search)!==-1;
        return condition1;
      })
      .map(user =>
      {
        return (
          <tr key={user.id}>

          <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
          <td> {user.id} </td>
          <td> {user.email} </td>
          <td> {user.isAdmin.toString()} </td>
          <td> {user.created_at} </td>
          <td> {user.updated_at} </td>
          </tr>
        )
      });

    return (
      <div >
        <br />
        Search user name:
        <input name="Search" onChange={this._searchUser} />
        <br />

        <h1>Users</h1>
        <table>
          <tbody>
        <tr>
        <th> name </th>
        <th> ID </th>
        <th> email </th>
        <th> admin </th>
        <th> created </th>
        <th> updated </th>
        </tr>
        {
          users
        }
        </tbody>
        </table>
        <br />
        <br />
      </div>

    )
  }
}
