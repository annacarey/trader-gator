import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Signup from '../components/Signup'
import PortfolioContainer from './PortfolioContainer'
import Transactions from '../components/Transactions'
import {getPortfolioActionCreator, getTransactionsActionCreator} from '../actionCreators'

class UserContainer extends React.Component {  

    componentDidMount() {

        // Load user's portfolio
        this.props.getPortfolio(this.props.id)

        // Load user's transactions
        this.props.getTransactions(this.props.id)
        
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path ="/" render={ () => <Signup /> } /> 
                    <Route exact path ="/portfolio" render={ () => <PortfolioContainer /> } /> 
                    <Route exact path ="/transactions" render={ () => <Transactions /> } /> 
                </Switch>
            </div>
        )
    }
}

const msp = state => {
    return {
       id: state.user.id
    }
}

const mdp = dispatch => {
    return {
        getPortfolio: id => dispatch(getPortfolioActionCreator(id)),
        getTransactions: id=> dispatch(getTransactionsActionCreator(id))
    }
}

export default connect(msp, mdp)(UserContainer)

