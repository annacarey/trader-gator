import React, {useEffect} from 'react';
import Portfolio from '../components/Portfolio'
import Purchase from '../components/Purchase'
import Navigation from '../components/Navigation'
import {getPortfolioActionCreator} from '../actionCreators'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

function PortfolioContainer(props) {

    useEffect(() => {
        props.id!==""? props.getPortfolio(props.id) : props.history.push('/')
    }, []);

    const updatePortfolio = () => {
        props.getPortfolio(props.id)
    }

    return (
        <div>
            <Navigation />
            <Portfolio />
            <Purchase updatePortfolio={updatePortfolio} />
        </div>
    )
}

const msp = state => {
    return {
       id: state.user.id,
       user: state.user,
       transactions: state.transactions
    }
}

const mdp = dispatch => {
    return {
        getPortfolio: id => dispatch(getPortfolioActionCreator(id)),
    }
}


export default withRouter(connect(msp, mdp)(PortfolioContainer))