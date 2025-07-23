import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('AED'); 
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const[rates, setRates] = useState({});

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then(res => res.json())
      .then(json => {
        console.log('Загруженные курсы:', json.rates); 
        setRates(json.rates)
      })
      .catch(err => {
        console.warn(err);
        alert('Не уадлось получить информацию')
      })
  },[])

  const onCahngeToPrice = (value) => {
    value = Number(value);
    console.log('Введено в toPrice:', value); 
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(value);
    setFromPrice(result);
  }

  const onCahngeFromPrice = (value) => {
    setFromPrice(value)
  }

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} onChangeValue={onCahngeFromPrice} 
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} onChangeValue={onCahngeToPrice} 
      />
    </div>
  );
}

export default App;
