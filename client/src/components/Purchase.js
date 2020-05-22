import React, {useState} from 'react';

function Purchase() {  

    const [ticker, setTicker] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = e => {
        e.preventDefault()
        console.log("submit worked", ticker, quantity)
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

export default Purchase