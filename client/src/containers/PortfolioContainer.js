import React, {useEffect} from 'react';
import Portfolio from '../components/Portfolio'
import Purchase from '../components/Purchase'
import Navigation from '../components/Navigation'
import {getPortfolioActionCreator} from '../actionCreators'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import styled from 'styled-components'

function PortfolioContainer(props) {

    useEffect(() => {
        props.id!==""? props.getPortfolio(props.id) : props.history.push('/')
    }, []);

    const updatePortfolio = () => {
        props.getPortfolio(props.id)
    }

    return (
        <Wrapper cursor={props.loading? "wait" : "auto"}>
            <Navigation portfolio={true} />
            <PortfolioWrapper>
                <Portfolio />
                <Purchase updatePortfolio={updatePortfolio} />
            </PortfolioWrapper>
        </Wrapper>
    )
}

const msp = state => {
    return {
       id: state.user.id,
       loading: state.loading
    }
}

const mdp = dispatch => {
    return {
        getPortfolio: id => dispatch(getPortfolioActionCreator(id)),
    }
}


export default withRouter(connect(msp, mdp)(PortfolioContainer))

const Wrapper = styled.div`
   height: 100%;
   cursor: ${props => props.cursor};
`

const PortfolioWrapper = styled.div`
    display: flex;
`