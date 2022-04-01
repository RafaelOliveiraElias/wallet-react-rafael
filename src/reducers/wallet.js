import { REQUEST_CURRENCIES_FAILURE, REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  data: {},
  error: '',
  expenses: [],
  editStage: false,
  editIndex: 0,
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
      data: action.currencies,
      currencies: Object.keys(action.currencies).filter((each) => each !== 'USDT'),
    };
  case REQUEST_CURRENCIES_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  case 'EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case 'DELETE_STUFF':
    return {
      ...state,
      expenses: [...state.expenses.filter((each) => each.id !== action.value)],
    };
  case 'EDIT_STUFF':
    return {
      ...state,
      editStage: true,
      editIndex: action.value,
    };
  case 'SAVE_STUFF':
    return {
      ...state,
      expenses: state.expenses.map((each) => {
        if (each.id === action.value.id) {
          return action.value;
        }
        return each;
      }),
      editStage: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
