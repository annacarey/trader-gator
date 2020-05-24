import React from 'react';
import Portfolio from '../components/Portfolio'
import Purchase from '../components/Purchase'
import Navigation from '../components/Navigation'

function PortfolioContainer() {  

    return (
        <div>
            <Navigation />
            <Portfolio />
            <Purchase />
        </div>
    )
}

export default PortfolioContainer