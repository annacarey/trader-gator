import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {logoutActionCreator} from '../actionCreators'
import styled from 'styled-components'

function Navigation(props) {  

    const handleClick = () => {
        props.logout().then(() => props.history.push('/'))
    }

    console.log(props.page)
    return (
        <Wrapper>
            <Option style={{borderLeft: '1px solid black'}} selected={props.portfolio? "#007EA7" : "white"}><MenuLink selected={props.portfolio? "#ffffff" : "black"}  to="/portfolio" exact>Portfolio</MenuLink></Option>
            <Option selected={!props.portfolio? "#003249" : "white"}><MenuLink selected={!props.portfolio? "#ffffff" : "black"} to="/transactions" exact>Transactions</MenuLink></Option>
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
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    align-items: center;
    background-color: ${props => props.selected};
    justify-content: flex-end;
`

const MenuLink = styled(NavLink)`
    color: ${props => props.selected};
    padding: 0px;
    text-decoration: none;
    &:visited {
        color: ${props => props.selected};
    }
    &:hover {
        color: #A9A9A9;
    }
`

const LogoutLink = styled.button`
    border: none;
    padding: 0px;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    font-size: 12px;
    &:hover {
        color: #A9A9A9;
    }
`