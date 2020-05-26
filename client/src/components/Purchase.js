import React, {useState} from 'react';
import {connect} from 'react-redux';
import {purchaseActionCreator} from '../actionCreators'

function Purchase(props) {  

    const [ticker, setTicker] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = e => {
        e.preventDefault()
        props.purchase(ticker, quantity, props.id)
        .then(() => props.updatePortfolio())
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setTicker(e.target.value)} value={ticker} type="text" name="ticker" placeholder="Ticker symbol..." />
                <input onChange={e => setQuantity(e.target.value)} value={quantity} type="number" min="0" name="ticker" placeholder="Number of shares..." />
                <input type="submit" value="Submit" />
            </form>
            {props.error!=="" && <p>{props.error}</p>}
        </div>
    )
}

const msp = state => {
    return {
       id: state.user.id,
       error: state.error
    }
}

const mdp = dispatch => {
    return {
        purchase: (ticker, quantity, userId) => dispatch(purchaseActionCreator(ticker, quantity, userId))
    }
}

export default connect(msp, mdp)(Purchase)