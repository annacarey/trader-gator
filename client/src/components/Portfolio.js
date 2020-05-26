import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components'

function Portfolio(props) {  

    // Calculate color of ticker text based on the status attribute of the stock
    const getTickerColor = status => {
        if (status === "higher") {
            return 'green'
        } else if (status === "lower") {
            return 'red'
        } else {
            return 'grey'
        }
    }

    return (
        <Wrapper>
            <p>{props.loading && "Loading..."}</p>
            <PortfolioValue>Portfolio Value: <strong>{props.portfolioValue}</strong></PortfolioValue>
            <Table>
                <tbody>
                    <TRHeader>
                        <TH colSpan={2}>Company</TH>
                        <TH>Current Value</TH>
                        <TH># Shares</TH>
                    </TRHeader>

                    {/* For each stock object in portfolio array, render a row in the table */}
                    {props.portfolio.map(portfolio => {
                        return <TR key={portfolio.ticker_symbol}>
                            <TD status={getTickerColor(portfolio.day_status)}>
                                {portfolio.ticker_symbol}
                                </TD>
                            <TD>{portfolio.stock_name}</TD>
                            <TD>${portfolio.total_value.toFixed(2)}</TD>
                            <TD>{portfolio.quantity}</TD>
                        </TR>
                    })}

                </tbody>
            </Table>
        </Wrapper>
    )
}

const msp = state => {
    return {
       portfolio: state.portfolio,
       portfolioValue: state.portfolioValue,
       id: state.user.id,
       loading: state.loading
    }
}


export default connect(msp)(Portfolio)

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 60%;
`

const PortfolioValue = styled.h3`
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
    color: ${props => props.status};
    border: 1px solid black;
    text-align: center;
`
const TH = styled.th`
    padding: 4px;
    vertical-align: top;
    border: 1px solid black;
`