import React from 'react';
import {connect} from 'react-redux';

function Transactions(props) {  
    console.log(props.transactions)

    return (
        <div>Transaction List
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
                    return <tr key={transaction.ticker_symbol}>
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
       transactions: state.transactions
    }
}

export default connect(msp)(Transactions)