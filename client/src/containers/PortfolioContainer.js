import React from 'react';
import Portfolio from '../components/Portfolio'
import Purchase from '../components/Purchase'
import Navigation from '../components/Navigation'
import {getPortfolioActionCreator} from '../actionCreators'
import {connect} from 'react-redux';


function PortfolioContainer(props) {  

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
       id: state.user.id
    }
}

const mdp = dispatch => {
    return {
        getPortfolio: id => dispatch(getPortfolioActionCreator(id)),
    }
}


export default connect(msp, mdp)(PortfolioContainer)