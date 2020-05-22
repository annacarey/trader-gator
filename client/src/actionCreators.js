
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
        dispatch(signupUser(response.user))
      })
}

const signupUser = user => ({
    type: 'SIGNUP_USER_SUCCESS', 
    payload: {user}
})


export {signupUserActionCreator}