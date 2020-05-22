import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserContainer from './containers/UserContainer'

class App extends Component {

  // Checking if I can hit the route
  componentDidMount() {
    window.fetch('/api/users')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));

    window.fetch('/stock-price')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div >
        <UserContainer/>
      </div>
    )
  } 
}

export default App;
