import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';

const testArr = [{title: 'test'}];


//we should probably  drop this in a util file
//http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
function compare(a,b) {
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
      search:''
    };
    this._searchUser=this._searchUser.bind(this)
    this._deleteUser=this._deleteUser.bind(this)
    this._promoteUser=this._promoteUser.bind(this)
  }
  componentDidMount() {
   axios.get(`/api/admin/users`)
   .then(res => res.data)
   .then( users => {
    this.setState({users:users.sort(compare)});
   });

  }

  _searchUser(e){
    this.setState({search:e.target.value.toLowerCase()})
  }
  _deleteUser(e,i){
    e.preventDefault();
    const user=this.state.users[i]
    axios.delete(`/api/admin/users/${user.id}`)
      .then(res => {
        const users = [...this.state.users]
        users.splice(i,1);
        this.setState({users})
      })
  }
  _promoteUser(e,i){
    e.preventDefault();
    const user = this.state.users[i];
    axios.put(`/api/admin/users/${user.id}`)
      .then(res => {
        const users = [...this.state.users];
        const promoted_user = Object.assign({},user,{isAdmin:true});
        users[i]=promoted_user;
        this.setState({users})
      })

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
      .map((user,i) =>
      {
        return (
          <tr key={user.id}>

          <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
          <td> {user.id} </td>
          <td> {user.email} </td>
          <td> {user.isAdmin.toString()} </td>
          <td> {user.created_at} </td>
          <td> {user.updated_at} </td>
          <td><button onClick={(event)=>this._deleteUser(event,i)}>
          delete user</button>
          </td>
          <td>
          {!user.isAdmin?<button onClick={(event)=>this._promoteUser(event,i)}>
          promote user</button>:null
      }
            </td>
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
