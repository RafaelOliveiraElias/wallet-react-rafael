const initialState = [];

function expensesReducer(state = initialState, action) {
  switch (action.type) {
  case 'EXPENSES':
    return [...state, action.value];
  default:
    return state;
  }
}

export default expensesReducer;
