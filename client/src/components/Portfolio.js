import React from 'react';
import {connect} from 'react-redux';

function Portfolio(props) {  

    return (
        <div>
            {/* Make sure account balance updates in addition to portfolio} */}
            <h3>Current Balance: {props.balance}</h3>
            <table>
                <tr>
                    <th>Symbol</th>
                    <th>Company Name</th>
                    <th>Current Value</th>
                    <th>Number of Shares Owned</th>
                </tr>
                {props.portfolio.map(portfolio => {
                    // Need to add in grey color if status is 'equal'
                    return <tr key={portfolio.ticker_symbol}>
                        <td style={{color: portfolio.day_status === "higher"? 'green' : 'red'}}>{portfolio.ticker_symbol}</td>
                        <td>{portfolio.stock_name}</td>
                        <td>{portfolio.total_value}</td>
                        <td>{portfolio.quantity}</td>
                    </tr>
                    
                })}
            </table>
        </div>
    )
}

const msp = state => {
    return {
       portfolio: state.portfolio,
       balance: state.user.accountBalance,
       id: state.user.id
    }
}


export default connect(msp)(Portfolio)