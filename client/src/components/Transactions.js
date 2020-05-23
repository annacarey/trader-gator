import React from 'react';
import {connect} from 'react-redux';

function Transactions(props) {  

    return (
        <div>Transaction
        </div>
    )
}

const msp = state => {
    return {
       portfolio: state.portfolio,
       balance: state.user.accountBalance
    }
}

export default connect(msp)(Transactions)