// Imports package to parse the date for transactions
import Moment from 'react-moment';
import moment from 'moment'

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
    .then(transactionsResponse => {
        console.log(transactionsResponse)
        // Make sure transactions are sorted by date in descending order (most recent is first)
        const transactions = transactionsResponse.map(transactionResponse => {
            return {
                tickerSymbol: transactionResponse.ticker_symbol,
                stockName: transactionResponse.stock_name,
                totalPrice: transactionResponse.total_price,
                quantity: transactionResponse.quantity,
                datePurchased: moment(new Date(transactionResponse.created_at)).format('M/D/YY') // Moment date formatter, can change format - helpful tutorial: http://thecodebarbarian.com/formatting-javascript-dates-with-moment-js.html
            }
        })
        dispatch(getTransactions(transactions))
    });
}

// created_at: "2020-05-23T00:16:32.583Z"
// current_price_per_share: "1453.99"
// id: 6
// quantity: 1
// stock_name: "Alphabet, Inc."
// ticker_symbol: "GOOGL"
// total_price: "1453.99"
// updated_at: "2020-05-23T00:16:32.583Z"
// user_id: 32
const getTransactions = transactions => ({
    type: 'GET_TRANSACTIONS',
    payload: {transactions}
})


export {signupUserActionCreator, purchaseActionCreator, getPortfolioActionCreator, getTransactionsActionCreator}