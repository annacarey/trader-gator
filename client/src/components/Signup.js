import React from 'react';

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
        console.log("submit worked")
    }

    render () {
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
            </div>
        )
    }
    
}

export default Signup