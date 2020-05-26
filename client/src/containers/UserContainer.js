import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Signup from '../components/Signup'
import PortfolioContainer from './PortfolioContainer'
import Transactions from '../components/Transactions'
import Login from '../components/Login'
import {getPortfolioActionCreator, getTransactionsActionCreator} from '../actionCreators'

class UserContainer extends React.Component {  

    render() {
        console.log('current user', this.props.user)
        return (
            <div>
                <Switch>
                    <Route exact path ="/" render={ () => <Signup /> } /> 
                    <Route exact path ="/login" render={ () => <Login /> } /> 
                    <Route exact path ="/portfolio" render={ () => <PortfolioContainer /> } /> 
                    <Route exact path ="/transactions" render={ () => <Transactions /> } /> 
                </Switch>
            </div>
        )
    }
}

const msp = state => {
    return {
       id: state.user.id,
       user: state.user
    }
}

const mdp = dispatch => {
    return {
        getPortfolio: id => dispatch(getPortfolioActionCreator(id)),
        getTransactions: id=> dispatch(getTransactionsActionCreator(id))
    }
}

export default withRouter(connect(msp, mdp)(UserContainer))