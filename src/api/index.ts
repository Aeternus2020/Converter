export async function CourseNow() {
    try {
      const storedUsdData = localStorage.getItem('USD') ?? '';
      const storedEurData = localStorage.getItem('EUR') ?? '';
      const shouldFetchUsdData = !storedUsdData || isDataStale(storedUsdData);
      const shouldFetchEurData = !storedEurData || isDataStale(storedEurData);

      // Выполнение запросов только при необходимости
      const response1 = shouldFetchUsdData
        ? await fetch('https://api.minfin.com.ua/mb/latest/f42b4998e82e31a81c657aef8ac9ac54f9c216a5/?currency=[USD]')
        : null;
  
      const response2 = shouldFetchEurData
        ? await fetch('https://api.minfin.com.ua/mb/latest/f42b4998e82e31a81c657aef8ac9ac54f9c216a5/?currency=[EUR]')
        : null;
  
      const data1 = response1 ? await response1.json() : JSON.parse(storedUsdData);
      const data2 = response2 ? await response2.json() : JSON.parse(storedEurData);
  
      localStorage.setItem('USD', JSON.stringify(data1));
      localStorage.setItem('EUR', JSON.stringify(data2));
  
      return { data1, data2 };
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return null;
    }
  }
  
  function isDataStale(storedData: string) {
    try {
      const parsedData = JSON.parse(storedData);
      const today = new Date().toISOString().split('T')[0];
      return parsedData.data.date.split(' ')[0] !== today;
    } catch (error) {
      console.error('Ошибка при парсинге данных:', error);
      return true;
    }
  }
  
  