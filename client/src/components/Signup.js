import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {signupUserActionCreator} from '../actionCreators'
import styled from 'styled-components'

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
        return (
            <Wrapper cursor={this.props.loading? "wait" : "auto"}>
                <Welcome>Trader Gator</Welcome>
                <P>The ultimate stock trading application</P>
                <Form onSubmit = {this.handleSubmit}>
                    <Input onChange={e => this.setState({firstName: e.target.value})} type="text" name="firstName" placeholder="First name..." />
                    <Input onChange={e => this.setState({lastName: e.target.value})} type="text" name="lastName" placeholder="Last name..." />
                    <Input onChange={e => this.setState({email: e.target.value})} type="text" name="email" placeholder="Last name..." />
                    <Input onChange={e => this.setState({password: e.target.value})} type="password" name="password" placeholder="Password..." />
                    <Input onChange={e => this.setState({passwordConfirmation: e.target.value})} type="password" name="password" placeholder="Confirm password..." />
                    <Submit type="submit" value="Signup" />
                </Form>
                {this.props.error !== "" && <p>{this.props.error}</p>}
                <p>Already have an account? <Link to='/login' exact>Log in here</Link></p>
            </Wrapper>
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
        error: state.error,
        loading: state.loading
    }
}

export default withRouter(connect(msp, mdp)(Signup))

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #F3F3F3;
    cursor: ${props => props.cursor};
`

const Welcome = styled.h1`
`

const P = styled.p`
    margin-top: 0;
    margin-bottom: 5%;
`

const Input = styled.input`
    width: 40%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    &:focus {
        outline: none;
    }
`

const Form = styled.form`
    width: 400px;
`

const Submit = styled.input`
    width: 30%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    background-color: black;
    color: white;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`