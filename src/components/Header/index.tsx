import React, { useEffect, useState } from 'react';
import { useCurrencyContext } from '../../CurrencyContext';
import { CurrencyData } from '../../CurrencyContext';

const Header = () => {
  const { value } = useCurrencyContext();
  const [usdDataNow, setUsdDataNow] = useState<CurrencyData | null>(null);
  const [eurDataNow, setEurDataNow] = useState<CurrencyData | null>(null);

  useEffect(() => {
    setUsdDataNow((value.usdData as CurrencyData));
    setEurDataNow((value.eurData as CurrencyData));
  }, [value]);  

  return (
    <header className='header_wrapper'>
      <div>
        <h3 className='header_currency-title'>USD:</h3>
        {usdDataNow ? (
          <>
            <p>Продаж: {parseFloat(usdDataNow.rateSell).toFixed(2)}грн.</p>
            <p>Купівля: {parseFloat(usdDataNow.rateBuy).toFixed(2)}грн.</p>
          </>
        ) : (
          <p>Завантаження обмінного курсу USD ...</p>
        )}
      </div>
      <div>
        <h3 className='header_currency-title'>EUR:</h3>
        {eurDataNow ? (
          <>
            <p>Продаж: {parseFloat(eurDataNow.rateSell).toFixed(2)}грн.</p>
            <p>Купівля: {parseFloat(eurDataNow.rateBuy).toFixed(2)}грн.</p>
          </>
        ) : (
          <p>Завантаження обмінного курсу EUR ...</p>
        )}
      </div>
    </header>
  );
};

export default Header;
