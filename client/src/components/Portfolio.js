import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components'

function Portfolio(props) {  

    return (
        <Wrapper>
            {/* Make sure account balance updates in addition to portfolio} */}
            <Balance>Current Balance: <strong>{props.balance}</strong></Balance>
            <Table>
                <TRHeader>
                    <TH colSpan={2}>Company</TH>
                    <TH>Current Value</TH>
                    <TH># Shares</TH>
                </TRHeader>
                {props.portfolio.map(portfolio => {
                    // Need to add in grey color if status is 'equal'
                    return <TR key={portfolio.ticker_symbol}>
                        <TD style={{color: portfolio.day_status === "higher"? 'green' : 'red'}}>{portfolio.ticker_symbol}</TD>
                        <TD>{portfolio.stock_name}</TD>
                        <TD>${portfolio.total_value.toFixed(2)}</TD>
                        <TD>{portfolio.quantity}</TD>
                    </TR>
                    
                })}
            </Table>
        </Wrapper>
    )
}

const msp = state => {
    console.log('in portfolio msp', state)
    return {
       portfolio: state.portfolio,
       balance: state.user.accountBalance,
       id: state.user.id
    }
}


export default connect(msp)(Portfolio)

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 60%;
`

const Balance = styled.h3`
    font-size: 20px;
    align-self: center;
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