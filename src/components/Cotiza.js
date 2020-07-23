import React from 'react';
import styled from '@emotion/styled';

const ResultDiv = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-animation: none;
    border-radius: 10px;
    border: none;
    font-size: 1.3rem;
    background-color: #FFF;
`;

const ResultP = styled.p`
    font-family: 'Arial', cursive;
    font-size: 18px;
    span{
        font-weight: bold;
    }
`;

const Price = styled.span`
    font-size: 30px;
    span{
        font-weight: bold;
    }
`;

const Cotiza = ({result}) => {
    if(Object.keys(result).length === 0) return null;

    console.log(result);

    return (  
        <ResultDiv>
            <ResultP>Price: <Price>{result.PRICE}</Price></ResultP>
            <ResultP>Last Update: <Price>{result.LASTUPDATE}</Price></ResultP>
            <ResultP>High Price:<Price>{result.HIGHDAY}</Price></ResultP>
            <ResultP>Low Price: <Price>{result.LOWDAY}</Price></ResultP>
            <ResultP>Change 24 Hour: <Price>{result.CHANGE24HOUR}</Price></ResultP>
        </ResultDiv>
    );
}
 
export default Cotiza;