import React, { useEffect, useState } from 'react';
import Main from './pages/main';
import { CurrencyProvider } from './CurrencyContext';
import { CourseNow } from './api';

function App() {
  const [initialCurrencyData, setInitialCurrencyData] = useState({
    usdData: null,
    eurData: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CourseNow();

        if (result) {
          const { USDdata, EURdata } = result;

          setInitialCurrencyData({
            usdData: USDdata,
            eurData: EURdata,
          });
        }
      } catch (error) {
        console.error('Помилка при отриманні даних:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CurrencyProvider value={initialCurrencyData}>
      <Main />
    </CurrencyProvider>
  );
}

export default App;
