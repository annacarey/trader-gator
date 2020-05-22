const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
}

function reducer(state = initialState, action) {

    switch(action.type) {
        case 'GET_USER_STARTED':
            return {...state, loading: true }
    }
}

export default reducer