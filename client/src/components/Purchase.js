import React, {useState} from 'react';
import {connect} from 'react-redux';
import {purchaseActionCreator} from '../actionCreators'
import styled from 'styled-components'

function Purchase(props) {  

    const [ticker, setTicker] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = e => {
        e.preventDefault()
        props.purchase(ticker, quantity, props.id)
        .then(() => props.updatePortfolio())
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <Input onChange={e => setTicker(e.target.value)} value={ticker} type="text" name="ticker" placeholder="Ticker symbol..." />
                <InputQuantity onChange={e => setQuantity(e.target.value)} value={quantity} type="number" min="1" name="ticker" placeholder="# of shares..." />
                <Submit type="submit" value="Submit" />
            </Form>
            {props.error!=="" && <p>{props.error}</p>}
        </Wrapper>
    )
}

const msp = state => {
    return {
       id: state.user.id,
       error: state.error
    }
}

const mdp = dispatch => {
    return {
        purchase: (ticker, quantity, userId) => dispatch(purchaseActionCreator(ticker, quantity, userId))
    }
}

export default connect(msp, mdp)(Purchase)

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    padding-top: 80px;
    width: 40%;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input`
    width: 25%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    background-color: #F3F3F3;
    &:focus {
        outline: none;
    }
`

const InputQuantity = styled.input`
    width: 25%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    text-align: center;
    background-color: #F3F3F3;
    &:focus {
        outline: none;
    }
`

const Submit = styled.input`
    width: 20%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    background-color: black;
    color: white;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`