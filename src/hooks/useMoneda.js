import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const SelectStyled = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-animation: none;
    border-radius: 10px;
    border: none;
    font-size: 1.3rem;
`;

const useMoneda = (label, stateInit, options) => {

    //State de custom hook
    const [state, updateState] = useState(stateInit);

    const Select = () => (
        <Fragment>
            <Label>{label}</Label>
            <SelectStyled
                onChange={e => updateState(e.target.value)}
                value={state}
            >
                <option value="">-- Select --</option>
                {options.map(op => (
                    <option key={op.cod} value={op.cod}>{op.name}</option>
                ))}
            </SelectStyled>
        </Fragment>
    );
    //return state, infertaz y func que modifica el state
    return [state, Select, updateState];
}

export default useMoneda;
