import React from 'react';
import {connect} from 'react-redux';

class Portfolio extends React.Component {  

    componentDidMount() {
        fetch(`/api/${this.props.id}/portfolio`)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    render() {
        return (
            <div>
                Portfolio 
            </div>
        )
    }
}

const msp = state => {
    return {
       id: state.user.id
    }
}

export default connect(msp)(Portfolio)