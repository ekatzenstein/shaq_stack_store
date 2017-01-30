import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';

export default class Signup extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);

    }

    handleChange(event) {
        const typeOfInput = event.target.getAttribute('name')
        if (typeOfInput === 'name') {
            console.log(event.target.value)
            this.setState({name: event.target.value})
        } else if (typeOfInput === 'email') {
            this.setState({email: event.target.value})
        } else {
            this.setState({password: event.target.value})
        }

    }

    createUser(e) {
        e.preventDefault()
        console.log('new user')
        console.log(this.state)

        const newUser = this.state;

        axios.post(`/api/users`, newUser).then(res => console.log(res))
    }

    render() {

        return (
            <div>
            <div >

                <h1>Sign Up</h1>

                <form>
                    <label>Name:</label>
                    <input name="name" type="text" onChange={this.handleChange}/>
                    <br/>
                    <label>Email</label>
                    <input name="email" type="text" onChange={this.handleChange}/>
                    <br/>
                    <label>Password</label>
                    <input name="password" type="text" onChange={this.handleChange}/>
                    <br/>
                    <button onClick={this.createUser}>Sign up</button>
                </form>

            </div>

             <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span> Login with Google</span>
            </a>
          </p>
        </div>
        </div>
        )
    }
}
