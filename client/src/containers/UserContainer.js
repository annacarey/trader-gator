import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Signup from '../components/Signup'
import PortfolioContainer from './PortfolioContainer'

class UserContainer extends React.Component {  
    render() {

        return (
            <div>
                Hello
                <Switch>
                    <Route exact path ="/" render={ () => <Signup /> } /> 
                    <Route exact path ="/portfolio" render={ () => <PortfolioContainer /> } /> 
                </Switch>
            </div>
        )
    }
}

export default UserContainer