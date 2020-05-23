
// Signup a new user
const signupUserActionCreator = userInfo => dispatch => {
    return fetch('/api/signup', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({user: userInfo})
    }).then((response) => response.json())
      .then(response => {
        console.log(response)
        dispatch(signupUser(response))
      })
}

const signupUser = user => ({
    type: 'SIGNUP_USER', 
    payload: {user}
})

// Purchase shares of a stock
const purchaseActionCreator = (ticker, quantity, userId) => dispatch => {
    console.log("user id", userId)
    return fetch('/api/purchase', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({ticker, quantity, id: userId})
    }).then((response) => response.json())
      .then(response => {
        console.log(response)
        const transaction = 
            {stockName: response.transaction.stock_name, 
            tickerSymbol: response.transaction.ticker_symbol,
            quantity: response.transaction.quantity,
            currentPrice: response.transaction.current_price_per_share,
            totalPrice: response.transaction.total_price
            }
        dispatch(purchaseStock(transaction))
      })
}

const purchaseStock = transaction => ({
    type: 'PURCHASE_STOCK', 
    payload: {transaction}
})



export {signupUserActionCreator, purchaseActionCreator}