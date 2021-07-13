const initState = {
  columns: [],
};

const columnReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_COLUMN':
      return state;
    case 'CREATE_COLUMN_ERROR':
    default:
      return state;
  }
};

export default columnReducer;
