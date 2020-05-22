import React, {useState} from 'react';
import {connect} from 'react-redux';

function Purchase(props) {  

    const [ticker, setTicker] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = e => {
        e.preventDefault()
        console.log("submit worked", ticker, quantity, props.id)
        fetch('/api/purchase', {
            method: "POST",
            headers: {'content-type': 'application/json',
                'accept': 'application/json'},
            body: JSON.stringify({ticker, quantity, id: props.id})
        }).then((response) => response.json())
          .then(response => {
            console.log(response)
          })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setTicker(e.target.value)} value={ticker} type="text" name="ticker" placeholder="Ticker symbol..." />
                <input onChange={e => setQuantity(e.target.value)} value={quantity} type="number" min="0" name="ticker" placeholder="Ticker symbol..." />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

const msp = state => {
    return {
       id: state.id
    }
}

export default connect(msp)(Purchase)