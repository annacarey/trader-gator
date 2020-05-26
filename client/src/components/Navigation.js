import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";

function Navigation(props) {  

    const handleClick = () => {
        fetch('/api/logout', {
            method: 'DELETE',
            headers: {'content-type': 'application/json',
            'accept': 'application/json'},
            credentials: 'include'
            }).then(response => response.json())
            .then(response => {
                
                
            })
            props.history.push('/')
    }

    return (
        <div>
            <NavLink to="/portfolio" exact>Portfolio</NavLink>
            <NavLink to="/transactions" exact>Transactions</NavLink>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default withRouter(Navigation)