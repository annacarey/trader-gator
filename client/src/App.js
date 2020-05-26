import React, { Component } from 'react';
import './App.css';
import UserContainer from './containers/UserContainer'
import {connect} from 'react-redux';
import {loginUser} from './actionCreators'
import {withRouter} from "react-router-dom";
import styled from 'styled-components'

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
      <Wrapper>
        <UserContainer/>
      </Wrapper>
    )
  } 
}

const mdp = dispatch => {
  return {
      login: user => dispatch(loginUser(user))
  }
}

export default withRouter(connect(null, mdp)(App))

const Wrapper = styled.div`
  width 100vw;
  height: 100vh;
`
