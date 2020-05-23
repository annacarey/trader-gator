const initialState = {
    user: {
        id: 32,
        firstName: "",
        lastName: "",
        email: "",
        accountBalance: 0,
    }, 
    transactions: [],
    portfolio: []
}

function reducer(state = initialState, action) {

    switch(action.type) {
        case 'SIGNUP_USER':
            return {...state, user: {id: action.payload.user.id, firstName: action.payload.user.first_name, lastName: action.payload.user.last_name, email: action.payload.user.email, accountBalance: action.payload.user.account_balance}}
        case 'PURCHASE_STOCK':
            return {...state, transactions: [... state.transactions, action.payload]}
        case 'GET_PORTFOLIO':
            return {...state, portfolio: action.payload.portfolio}
        case 'GET_TRANSACTIONS':
            return {...state, transactions: action.payload.transactions}
        default:
            return state
    }
}

export default reducer