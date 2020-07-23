import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
//Hooks
import useMoneda from '../hooks/useMoneda';
import useCrypto from '../hooks/useCrypto';
import Axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &::hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({saveMoneda, saveCrypto}) => {

    //State list crypto
    const [listCrypto, saveCryptoList] = useState([]);
    const [error, saveError] = useState(false);

    const MONEDAS = [
        {cod: 'USD', name: 'Dolar de Estado Unidos'},
        {cod: 'MXN', name: 'Peso Mexicano'},
        {cod: 'VEF', name: 'Bolivares de Venezuela'},
        {cod: 'EUR', name: 'Euro'},
        {cod: 'GBP', name: 'Libra Esterlina'},
        {cod: 'ARS', name: 'Peso Argentino'},
        {cod: 'CAD', name: 'Dolar Canadiense'}
    ]

    //Utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu Moneda', '', MONEDAS);
    
    //Utilizar useCripto
    const [cryptoMoneda, SelectCrypto] = useCrypto('Elige tu Cryptomoneda', '', listCrypto);

    useEffect(() => {
        const consultAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=cad';

            const result = await Axios.get(url);

            saveCryptoList(result.data.Data);
        }
        consultAPI();
    },[]);

    //onSubmit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if(moneda === '' || cryptoMoneda === ''){
            saveError(true);
            return;
        }
        saveError(false);
        //Pasar los datos al componente principal
        saveMoneda(moneda);
        saveCrypto(cryptoMoneda);

    }

    return (  
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error text="Debe Selecionar ambos campos"/> : null } 
            <SelectMoneda />
            <SelectCrypto />
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;