import React, { Component } from 'react';
import './App.css';
import UserContainer from './containers/UserContainer'
import {connect} from 'react-redux';
import {loginUser} from './actionCreators'
import {withRouter} from "react-router-dom";

class App extends Component {

  componentDidMount() {
    fetch('/api/auto_login', {
      method: 'GET',
      headers: {'content-type': 'application/json',
      'accept': 'application/json'},
      credentials: 'include'
      }).then(response => response.json())
    .then(response => {
      if (response.user) {
        this.props.login(response.user)
        this.props.history.push('/portfolio')
      }
    })
  }

  render() {
    return (
      <div >
        <UserContainer/>
      </div>
    )
  } 
}

const mdp = dispatch => {
  return {
      login: user => dispatch(loginUser(user))
  }
}

export default withRouter(connect(null, mdp)(App))
