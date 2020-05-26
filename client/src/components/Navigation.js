import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {logoutActionCreator} from '../actionCreators'
import styled from 'styled-components'

function Navigation(props) {  

    const handleClick = () => {
        props.logout().then(() => props.history.push('/'))
    }

    return (
        <Wrapper>
            <Option><MenuLink to="/portfolio" exact>Portfolio</MenuLink></Option>
            <Option><MenuLink to="/transactions" exact>Transactions</MenuLink></Option>
            <LogoutLink onClick={handleClick}>Logout</LogoutLink>
        </Wrapper>
    )
}

const mdp = dispatch => {
    return {
        logout: () => dispatch(logoutActionCreator())
    }
}

export default withRouter(connect(null, mdp)(Navigation))

const Wrapper = styled.div`
    display: flex;
    font-size: 12px;
    justify-content: center;
`
const Option = styled.div`
    cursor: pointer;
    padding: 8px;
    padding-left: 5px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const MenuLink = styled(NavLink)`
    color: black;
    padding: 0px;
    text-decoration: none;
    &:visited {
        color: black;
    }
    &:hover {
        color: #A9A9A9;
    }
`

const LogoutLink = styled.button`
    border: none;
    padding: 0px;
    cursor: pointer;
    font-size: 12px;
    &:hover {
        color: #A9A9A9;
    }
`