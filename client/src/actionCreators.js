
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

// Load user's portfolio
const getPortfolioActionCreator = userId => dispatch => {
    console.log("in portfolio action creator")
    return fetch(`/api/${userId}/portfolio`)
    .then(response => response.json())
    .then(portfolioArray => {
        dispatch(getPortfolio(portfolioArray))
    });
}

const getPortfolio = portfolio => ({
    type: 'GET_PORTFOLIO',
    payload: {portfolio}
})

// Load user's transactions
const getTransactionsActionCreator = userId => dispatch => {
    return fetch(`/api/${userId}/transactions`)
    .then(response => response.json())
    .then(transactions => {
        dispatch(getTransactions(transactions))
    });
}

const getTransactions = transactions => ({
    type: 'GET_TRANSACTIONS',
    payload: {transactions}
})


export {signupUserActionCreator, purchaseActionCreator, getPortfolioActionCreator, getTransactionsActionCreator}