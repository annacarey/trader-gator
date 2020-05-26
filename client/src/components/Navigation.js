import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {logoutActionCreator} from '../actionCreators'

function Navigation(props) {  

    const handleClick = () => {
        props.logout().then(() => props.history.push('/'))
    }

    return (
        <div>
            <NavLink to="/portfolio" exact>Portfolio</NavLink>
            <NavLink to="/transactions" exact>Transactions</NavLink>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

const mdp = dispatch => {
    return {
        logout: () => dispatch(logoutActionCreator())
    }
}

export default withRouter(connect(null, mdp)(Navigation))