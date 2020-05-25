import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Navigation from '../components/Navigation'
import {withRouter} from "react-router-dom";
import {getTransactionsActionCreator} from '../actionCreators'

function Transactions(props) {  

    useEffect(() => {
        props.id!==""? props.getTransactions(props.id) : props.history.push('/')
    }, []);

    return (
        <div> 
            <Navigation />
            <h1>Transactions</h1>
            <table>
                <tr>
                    <th>Symbol</th>
                    <th>Company Name</th>
                    <th>Total Purchase Value</th>
                    <th>Number of Shares Owned</th>
                    <th>Date Purchased</th>
                </tr>
                {props.transactions.map(transaction => {
                    // Need to add in grey color if status is 'equal'
                    return <tr key={transaction.tickerSymbol}>
                        <td>{transaction.tickerSymbol}</td>
                        <td>{transaction.stockName}</td>
                        <td>{transaction.totalPrice}</td>
                        <td>{transaction.quantity}</td>
                        <td>{transaction.datePurchased}</td>
                    </tr>
                    
                })}
            </table>
        </div>
    )
}

const msp = state => {
    return {
       transactions: state.transactions,
       id: state.user.id
    }
}

const mdp = dispatch => {
    return {
        getTransactions: id=> dispatch(getTransactionsActionCreator(id))
    }
}

export default withRouter(connect(msp, mdp)(Transactions))