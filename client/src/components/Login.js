import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
import {loginUserActionCreator} from '../actionCreators'

function UserLogin(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        props.login(email, password).then(() => {
            props.error === "" && props.history.push('/portfolio')})
        }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input placeholder="Email" onChange={e => setEmail(e.target.value)} type="text" name="email" value={email} ></input>
                <br />
                <input placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" name="password" value={password} ></input>
                <br />
                <input type="submit" value="Login"></input>
            </form>
            {props.error !== "" && <p>{props.error}</p>}
            <Link to='/' exact>Go back</Link>
            
        </div>
    )
}

const msp = state => {
    return {
       error: state.error
    }
}

const mdp = dispatch => {
    return {
        login: (email, password) => dispatch(loginUserActionCreator(email, password))
    }
}

export default  withRouter(connect(msp, mdp)(UserLogin))

