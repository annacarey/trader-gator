import React from 'react';
import {connect} from 'react-redux';

function Transactions(props) {  
    console.log(props.transactions)

    return (
        <div>Transaction
            
        </div>
    )
}

const msp = state => {
    return {
       transactions: state.transactions
    }
}

export default connect(msp)(Transactions)