import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {signupUserActionCreator} from '../actionCreators'

class Signup extends React.Component {  

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    }

    handleSubmit = e => {
        e.preventDefault()

        // Signup fetch call to backend (via redux)
        this.props.signup(this.state)

        // Push to portfolio page if no errors
        .then(() => this.props.error === "" && this.props.history.push('/portfolio'))
        
    }

    render () {
        console.log(this.props.user)
        return (
            <div>
                Signup
                <form onSubmit = {this.handleSubmit}>
                    <input onChange={e => this.setState({firstName: e.target.value})} type="text" name="firstName" placeholder="First name..." />
                    <input onChange={e => this.setState({lastName: e.target.value})} type="text" name="lastName" placeholder="Last name..." />
                    <input onChange={e => this.setState({email: e.target.value})} type="text" name="email" placeholder="Last name..." />
                    <input onChange={e => this.setState({password: e.target.value})} type="password" name="password" placeholder="Password..." />
                    <input onChange={e => this.setState({passwordConfirmation: e.target.value})} type="password" name="password" placeholder="Confirm password..." />
                    <input type="submit" value="Signup" />
                </form>
                {this.props.error !== "" && <p>{this.props.error}</p>}
                <p>Already have an account? <Link to='/login' exact>Log in here</Link></p>
            </div>
        )
    } 
}

const mdp = dispatch => {
    return {
        signup: userInfo => dispatch(signupUserActionCreator(userInfo))
    }
}

const msp = state => {
    return {
        user: state.user,
        error: state.error
    }
}

export default withRouter(connect(msp, mdp)(Signup))