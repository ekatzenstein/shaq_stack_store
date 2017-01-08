import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';

export default class Products extends Component {

  constructor() {
    super();
    this.state = {
      users:['laksdf']
    };
  }
  componentDidMount() {
   //this.nextJoke()
   axios.get('/api/users')
   .then(res => res.data)
   .then( orders => {
     console.log(orders)
    // this.setState({products: products});
   });
  }

  render() {

    return (
      <div>
      {
        this.state.users.map((user,i)=>{
          return (<div key={i}>{user}</div>)
        })
      }
      </div>
    )
  }
}
