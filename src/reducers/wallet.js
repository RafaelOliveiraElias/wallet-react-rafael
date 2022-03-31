import { REQUEST_CURRENCIES_FAILURE, REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: Object.keys(action.currencies).filter((each) => each !== 'USDT'),
    };
  case REQUEST_CURRENCIES_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default walletReducer;
