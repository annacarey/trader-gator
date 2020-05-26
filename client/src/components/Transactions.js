import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Navigation from '../components/Navigation'
import {withRouter} from "react-router-dom";
import {getTransactionsActionCreator} from '../actionCreators'
import styled from 'styled-components'

function Transactions(props) {  

    useEffect(() => {
        props.id!==""? props.getTransactions(props.id) : props.history.push('/')
    }, []);

    return (
        <div> 
            <Navigation portfolio={false} />
            <Wrapper cursor={props.loading? "wait" : "auto"}>
                <p>{props.loading && "Loading..."}</p>
                <Table>
                    <tbody>
                        <TRHeader>
                            <TH colSpan={2}>Company</TH>
                            <TH>Total Price</TH>
                            <TH># Shares</TH>
                            <TH>Date</TH>
                        </TRHeader>
                        {props.transactions.map(transaction => {
                            return <TR key={transaction.tickerSymbol}>
                                <TD>{transaction.tickerSymbol}</TD>
                                <TD>{transaction.stockName}</TD>
                                <TD>{transaction.totalPrice}</TD>
                                <TD>{transaction.quantity}</TD>
                                <TD>{transaction.datePurchased}</TD>
                            </TR>
                            
                        })}
                    </tbody>
                </Table>
            </Wrapper>
        </div>
    )
}

const msp = state => {
    return {
       transactions: state.transactions,
       id: state.user.id,
       loading: state.loading
    }
}

const mdp = dispatch => {
    return {
        getTransactions: id=> dispatch(getTransactionsActionCreator(id))
    }
}

export default withRouter(connect(msp, mdp)(Transactions))

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 60%;
    align-items: center;
    width: 100%;
    cursor: ${props => props.cursor};
`

const Table = styled.table`
    border-collapse: collapse;
`

const TR = styled.tr`
    padding: 4px;
    vertical-align: top;
    border: 1px solid black;
    &:hover {
        background-color: #f5f5f5;
    }
`

const TRHeader = styled.tr`
    padding: 4px;
    vertical-align: top;
    border: 1px solid black;
`

const TD = styled.td`
    padding: 4px;
    vertical-align: top;
    border: 1px solid black;
    text-align: center;
`
const TH = styled.th`
    padding: 4px;
    vertical-align: top;
    border: 1px solid black;
`