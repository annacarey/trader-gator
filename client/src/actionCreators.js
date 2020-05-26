// Imports package to parse the date for transactions
import moment from 'moment'

// Signup a new user
const signupUserActionCreator = userInfo => dispatch => {
    dispatch(loading())
    return fetch('/api/signup', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({user: userInfo})
    }).then((response) => response.json())
      .then(response => {
          if (response.error) {
            dispatch(signupUserFailed(response.error))
          } else {
            dispatch(signupUser(response))
          }
      })
}

const signupUser = user => ({
    type: 'SIGNUP_USER', 
    payload: {user}
})

const signupUserFailed = error => ({
    type: 'SIGNUP_USER_FAILED',
    payload: error
})

// Log in user
const loginUserActionCreator = (email, password) => dispatch => {
    dispatch(loading())
    return fetch('/api/login', {
        method: 'POST',
        headers: {'content-type': 'application/json',
        'accept': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({email, password})
    }).then(response => response.json())
    .then(response => {
        if (response.error) {
            dispatch(loginUserError(response.error))
        } else {
            dispatch(loginUser(response.user))
        }
    })
}

const loginUser = user => ({
    type: 'LOGIN_USER',
    payload: {user}
})

const loginUserError = error => ({
    type: 'LOGIN_USER_ERROR',
    payload: error
})

// Purchase shares of a stock
const purchaseActionCreator = (ticker, quantity, userId) => dispatch => {
    dispatch(loading())
    return fetch('/api/purchase', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({ticker, quantity, id: userId})
    }).then((response) => response.json())
      .then(response => {
        console.log(response)
        if (response.error) {
            dispatch(purchaseStockFailed(response.error))
        } else {
            dispatch(purchaseStock(response.balance))
        }      
      })
}

const purchaseStock = balance => ({
    type: 'PURCHASE_STOCK', 
    payload: {balance}
})

const purchaseStockFailed = error => ({
    type: 'PURCHASE_STOCK_FAILED',
    payload: error
})

// Load user's portfolio
const getPortfolioActionCreator = userId => dispatch => {
    dispatch(loading())
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
    dispatch(loading())
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

const getTransactions = transactions => ({
    type: 'GET_TRANSACTIONS',
    payload: {transactions}
})

const logoutActionCreator = () => dispatch => {
    return fetch('/api/logout', {
        method: 'DELETE',
        headers: {'content-type': 'application/json',
        'accept': 'application/json'},
        credentials: 'include'
        }).then(() => dispatch(logout()))
}

const logout = () =>({
    type: 'LOGOUT_USER'
})

// Loading function
const loading = () => ({
    type: 'LOADING'
})


export {signupUserActionCreator, loginUserActionCreator, loginUser, purchaseActionCreator, getPortfolioActionCreator, getTransactionsActionCreator, logoutActionCreator}