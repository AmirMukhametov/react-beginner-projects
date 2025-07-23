import React, { useEffect, useState, useRef } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('AMD'); 
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef({});

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then(res => res.json())
      .then(json => {
        console.log('Загруженные курсы:', json.rates); 
        ratesRef.current = json.rates;
        onCahngeToPrice(1);
      })
      .catch(err => {
        console.warn(err);
        alert('Не удалось получить информацию');
      });
  }, []);

  const onCahngeFromPrice = (value) => {
    const price = +value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  };

  const onCahngeToPrice = (value) => {
    const result = ratesRef.current[fromCurrency] / ratesRef.current[toCurrency] * +value;
    setFromPrice(result);
    setToPrice(value);
  };

  useEffect(() => {
    onCahngeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onCahngeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onCahngeFromPrice} 
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onCahngeToPrice} 
      />
    </div>
  );
}

export default App;