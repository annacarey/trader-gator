import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
import {getUserActionCreator} from '../actionCreators'

function UserLogin(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log("email pass", email, password)

    const handleSubmit = e => {
        console.log(email, password)
        e.preventDefault()
        fetch('/api/login', {
            method: 'POST',
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({email: email, password: password})
        }).then(response => response.json())
        .then(response => console.log(response))
    }
    // fetch('/api/signup', {
    //     method: "POST",
    //     headers: {'content-type': 'application/json',
    //         'accept': 'application/json'},
    //     body: JSON.stringify({user: userInfo})
    // }).then((response) => response.json())
    //   .then(response => {
    //     console.log('signup user', response)
    //     dispatch(signupUser(response))
    //   })

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input placeholder="Email" onChange={e => setEmail(e.target.value)} type="text" name="email" value={email} ></input>
                <br />
                <input placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" name="password" value={password} ></input>
                <br />
                <input type="submit" value="Login"></input>
            </form>
            <Link to='/' exact>Go back</Link>
            
        </div>
    )
}

const msp = state => {
    return {
       
    }
}

const mdp = dispatch => {
    return {
        // login: (email, password) => dispatch(getUserActionCreator(email, password))
    }
}

export default  withRouter(connect(msp, mdp)(UserLogin))

