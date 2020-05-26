const initialState = {
    user: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        accountBalance: 0,
    }, 
    error: "",
    loading: false,
    transactions: [],
    portfolio: [],
    portfolioValue: 0
}

function reducer(state = initialState, action) {

    switch(action.type) {
        case 'SIGNUP_USER':
            return {...state, loading: false, error: "", user: {id: action.payload.user.id, firstName: action.payload.user.first_name, lastName: action.payload.user.last_name, email: action.payload.user.email, accountBalance: action.payload.user.account_balance}}
        case 'SIGNUP_USER_FAILED':
            return {...state, loading: false, error: action.payload}
        case 'LOGIN_USER':
            return {...state, loading: false, error: "", user: {id: action.payload.user.id, firstName: action.payload.user.first_name, lastName: action.payload.user.last_name, email: action.payload.user.email, accountBalance: action.payload.user.account_balance}}
        case 'LOGIN_USER_ERROR':
            return {...state, loading: false, error: action.payload}
        case 'LOGOUT_USER':
            return initialState
        case 'PURCHASE_STOCK':
            return {...state, loading: false, error: "", user: {...state.user, accountBalance: action.payload.balance}}
        case 'PURCHASE_STOCK_FAILED':
            return {...state, loading: false, error: action.payload}
        case 'GET_PORTFOLIO':
            return {...state, loading: false, portfolioValue: action.payload.portfolioValue, portfolio: action.payload.portfolio}
        case 'GET_TRANSACTIONS':
            return {...state, loading: false, transactions: action.payload.transactions}
        case 'LOADING':
            return {...state, loading: true}
        default:
            return state
    }
}

export default reducer