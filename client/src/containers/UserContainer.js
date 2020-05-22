import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Signup from '../components/Signup'

class UserContainer extends React.Component {  
    render() {

        return (
            <div>
                Hello
                <Switch>
                    <Route exact path ="/" render={ () => <Signup /> } /> 
                </Switch>
            </div>
        )
    }
}

export default UserContainer