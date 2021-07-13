const initState = {
  tickets: [],
};

const ticketReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return state;
    case 'CREATE_TICKET_ERROR':
      return state;
    case 'UPDATE_TICKET':
      return state;
    case 'UPDATE_TICKET_ERROR':
      return state;
    case 'DELETE_TICKET':
      return state;
    case 'DELETE_TICKET_ERROR':
      return state;
    default:
      return state;
  }
};

export default ticketReducer;
