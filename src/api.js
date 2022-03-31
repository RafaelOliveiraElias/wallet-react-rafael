const getCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getCurrencies;
