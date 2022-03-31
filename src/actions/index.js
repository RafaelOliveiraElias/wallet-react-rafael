// Coloque aqui suas actions
import getCurrencies from '../api';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES_LOCATION';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';

export const login = (value) => ({ type: 'LOGIN', value });

export const expenses = (value) => ({ type: 'EXPENSES', value });

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const requestCurrenciesSuccess = (data) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies: data,
});

export const requestCurrenciesFailure = (error) => ({
  type: REQUEST_CURRENCIES_FAILURE,
  error,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const currencies = await getCurrencies();
      dispatch(requestCurrenciesSuccess(currencies));
    } catch (error) {
      dispatch(requestCurrenciesFailure(error));
    }
  };
}
