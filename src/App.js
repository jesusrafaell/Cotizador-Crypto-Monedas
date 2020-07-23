import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomoneda.png';
import Formulario from './components/Formulario';
import Cotiza from './components/Cotiza';
import Axios from 'axios';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Arial Black', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700px;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
   content: '';
   width: 100px;
   height: 6px;
   background-color: #66A2FE; 
   display:block;
  }
`;

function App() {

  const [moneda, saveMoneda] = useState('');
  const [crypto, saveCryptoMoneda] = useState('');
  const [result, saveResult] = useState({});
  const [load, saveLoad] = useState(false);

  useEffect(() => {
    
    const cotizarCryptoMoneda = async () => {
      //evitamos la ejecuion la primera vez
      if(moneda === '') return;

      //consultar la api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`;

      const result = await Axios.get(url);

      //mostrar spinner
      saveLoad(true);

      //ocultar spinner
      setTimeout(() => {
        //cambar stado del spinner
        saveLoad(false);

        //save cotizacion
        saveResult(result.data.DISPLAY[crypto][moneda]);
      }, 3000);
    }
    cotizarCryptoMoneda();
  }, [moneda, crypto]);

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen crypto "
        />
      </div>
      <div>
        <Heading>
          COTIZA CRYPTOMONEDAS
        </Heading>
        <Formulario 
          saveMoneda={saveMoneda}
          saveCrypto={saveCryptoMoneda}
        />
        {!load ? 
          <Cotiza 
            result={result}
          />  
          :
          <Spinner />
        }
        
      </div>
    </Contenedor>
  );
}

export default App;
