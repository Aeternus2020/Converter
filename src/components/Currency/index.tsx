import React, { useState } from 'react';
import { useCurrencyContext } from '../../CurrencyContext';

const CurrencyConverter = () => {
  const [amount1, setAmount1] = useState<number>(0);
  const [currency1, setCurrency1] = useState<string>('UAH');
  const [amount2, setAmount2] = useState<number>(0);
  const [currency2, setCurrency2] = useState<string>('USD');
  const { value } = useCurrencyContext();

  const USD = value.usdData;
  const EUR = value.eurData;

  const currencies = ['UAH', 'USD', 'EUR'];

  const handleAmountChange = (value: string, side: 'from' | 'to') => {
    const numericValue = value === '' ? 0 : Math.max(0, parseFloat(value));

      if (side === 'from') {
        setAmount1(numericValue);
        setAmount2(convert(numericValue, currency1, currency2));
      } else {
        setAmount2(numericValue);
        setAmount1(convert(numericValue, currency2, currency1));
    }
  };

  const handleCurrencyChange = (value: string, side: 'from' | 'to') => {
    if (side === 'from') {
      setCurrency1(value);
      setAmount2(convert(amount1, value, currency2));
    } else {
      setCurrency2(value);
      setAmount2(convert(amount1, currency1, value));
    }
  };

  const convert = (amount: number, fromCurrency: string, toCurrency: string): number => {
	if (fromCurrency === toCurrency) {
	  return amount;
	}
	
	const isBuying = fromCurrency !== 'UAH';
	const exchangeRate = getExchangeRate(fromCurrency, toCurrency, isBuying);
	return parseFloat((amount * exchangeRate).toFixed(2));
  };  
  const getExchangeRate = (fromCurrency: string, toCurrency: string, isBuying: boolean): number => {
	const usdToUah: number | null = USD ? (isBuying ? parseFloat(USD.rateBuy) : parseFloat(USD.rateSell)) : null;
	const eurToUah: number | null = EUR ? (isBuying ? parseFloat(EUR.rateBuy) : parseFloat(EUR.rateSell)) : null;
  
	if (usdToUah === null || eurToUah === null) {
	  return 0; 
	}
  
	if (fromCurrency === 'UAH') {
	  return toCurrency === 'USD' ? 1 / usdToUah : 1 / eurToUah;
	}
  
	if (toCurrency === 'UAH') {
	  return fromCurrency === 'USD' ? usdToUah : eurToUah;
	}
  
	const fromRate = fromCurrency === 'USD' ? usdToUah : eurToUah;
	const toRate = toCurrency === 'USD' ? usdToUah : eurToUah;
  
	return fromRate !== 0 ? toRate / fromRate : 0;
  };  

  return (
    <div className='converter_wrapper'>
      <div className='converter_input'>
		<span className='converter_input_title'>В мене є: </span>
        <input type="number" value={amount1 === 0 ? '' : amount1} onChange={(e) => handleAmountChange(e.target.value, 'from')} />
        <select value={currency1} onChange={(e) => handleCurrencyChange(e.target.value, 'from')}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className='converter_input'>
	  <span className='converter_input_title'>Я отримаю: </span>
        <input type="number" value={amount2 === 0 ? '' : amount2} onChange={(e) => handleAmountChange(e.target.value, 'to')} />
        <select value={currency2} onChange={(e) => handleCurrencyChange(e.target.value, 'to')}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
