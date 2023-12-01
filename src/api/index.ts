export async function CourseNow() {
  try {
    const storedUsdData = localStorage.getItem('USD');
    const storedEurData = localStorage.getItem('EUR');
    const shouldFetchUsdData = !storedUsdData || isDataStale(storedUsdData);
    const shouldFetchEurData = !storedEurData || isDataStale(storedEurData);

    const lastFetchTime = localStorage.getItem('lastFetchTime');
    const currentTime = new Date().getTime();

    if (lastFetchTime && currentTime - parseInt(lastFetchTime) < 5 * 60 * 1000) {
      console.log('Минуло менше 5 хвилин з часу останнього успішного запиту. Новий запит не виконується.');
      return { USDdata: storedUsdData ? JSON.parse(storedUsdData) : null, EURdata: storedEurData ? JSON.parse(storedEurData) : null };
    }

    if (shouldFetchUsdData || shouldFetchEurData) {
      const response = await fetch('https://api.monobank.ua/bank/currency');

      if (response.ok) {
        const responseData = await response.json();
        const USDdata = responseData[0];
        const EURdata = responseData[1];

        localStorage.setItem('USD', JSON.stringify(USDdata));
        localStorage.setItem('EUR', JSON.stringify(EURdata));

        localStorage.setItem('lastFetchTime', currentTime.toString());

        return { USDdata, EURdata };
      } else {
        console.error('Помилка при отриманні даних від сервера:', response.status);
        return null;
      }
    } else {
      return { USDdata: storedUsdData ? JSON.parse(storedUsdData) : null, EURdata: storedEurData ? JSON.parse(storedEurData) : null };
    }
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
    return null;
  }
}

function isDataStale(storedData: string | null) {
  try {
    if (!storedData) {
      return true;
    }

    const parsedData = JSON.parse(storedData);
    const today = new Date().toISOString().split('T')[0];

    const dataDate = new Date(parsedData.date * 1000).toISOString().split('T')[0];

    return dataDate !== today;
  } catch (error) {
    console.error('Помилка під час аналізу даних:', error);
    return true;
  }
}

