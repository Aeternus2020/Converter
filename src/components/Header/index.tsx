import React, { useEffect, useState } from 'react';
import { CourseNow } from '../../api';

const Header = () => {
  const [usdData, setUsdData] = useState<{ ask: string; bid: string } | null>(null);
  const [eurData, setEurData] = useState<{ ask: string; bid: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await CourseNow();

      if (result) {
        const { data1, data2 } = result;
        setUsdData(data1?.data || null);
        setEurData(data2?.data || null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h3>USD:</h3>
        {usdData ? (
          <>
            <pre>Продаж: {usdData.ask} грн.</pre>
            <pre>Покупка: {usdData.bid} грн.</pre>
          </>
        ) : (
          <p>Загрузка курса USD ...</p>
        )}
      </div>
      <div>
        <h3>EUR:</h3>
        {eurData ? (
          <>
            <pre>Продаж:{eurData.ask} грн.</pre>
            <pre>Покупка:{eurData.bid} грн.</pre>
          </>
        ) : (
          <p>Загрузка курса EUR ...</p>
        )}
      </div>
    </div>
  );
};

export default Header;
