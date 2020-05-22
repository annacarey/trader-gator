const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
}

function reducer(state = initialState, action) {

    switch(action.type) {
        case 'SIGNUP_USER':
            return action.payload
        default:
            return state
    }
}

export default reducer