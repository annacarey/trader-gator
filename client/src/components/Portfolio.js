import React from 'react';
import {connect} from 'react-redux';

function Portfolio() {  

    return (
        <div>
            Portfolio 
        </div>
    )
}

const msp = state => {
    return {
       portfolio: state.portfolio
    }
}

export default connect(msp)(Portfolio)