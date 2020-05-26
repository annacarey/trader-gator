import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
import {loginUserActionCreator} from '../actionCreators'
import styled from 'styled-components'


function UserLogin(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Log the user in with form input email and password unless there is an error
    // Successful log in pushes to /portfolio route
    const handleSubmit = e => {
        e.preventDefault()
        props.login(email, password).then(response => {
            !response.error && props.history.push('/portfolio')})
        }

    return (
        <Wrapper cursor={props.loading? "wait" : "auto"}> 
            <Form onSubmit = {handleSubmit}>
                <Input placeholder="Email" onChange={e => setEmail(e.target.value)} type="text" name="email" value={email} ></Input>
                <br />
                <Input placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" name="password" value={password} ></Input>
                <br />
                <Submit type="submit" value="Login"></Submit>
            </Form>
            {props.error !== "" && <p>{props.error}</p>}
            <Link to='/' exact>Go back</Link>
            
        </Wrapper>
    )
}

const msp = state => {
    return {
       error: state.error,
       loading: state.loading
    }
}

const mdp = dispatch => {
    return {
        login: (email, password) => dispatch(loginUserActionCreator(email, password))
    }
}

export default  withRouter(connect(msp, mdp)(UserLogin))

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #F3F3F3;
    cursor: ${props => props.cursor};
`

const Form = styled.form`
    width: 200px;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    &:focus {
        outline: none;
    }
`

const Submit = styled.input`
    width: 60%;
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