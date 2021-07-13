import { db } from '../fbConfig';

export const addTicket = (ticket) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    db.collection('tickets')
      .add({
        ...ticket,
        DOR: new Date(),
      })
      .then(() => {
        console.log('ticket added');
        dispatch({
          type: 'ADD_TICKET',
          ticket,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'CREATE_TICKET_ERROR',
          err,
        });
      });
  };
};

export const addColumn = (name, ticketArray) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    db.collection('columns')
      .add({
        name: name,
        items: [...ticketArray],
      })
      .then(() => {
        console.log('Column added');
        dispatch({
          type: 'ADD_COLUMN',
          ticketArray,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'CREATE_COLUMN_ERROR',
          err,
        });
      });
  };
};

export const updateTicket = (docId, ticket) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    db.collection('tickets')
      .doc(docId)
      .update({
        ...ticket,
        DOR: new Date(),
      })
      .then(() => {
        dispatch({
          type: 'UPDATE_TICKET',
          ticket,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'UPDATE_TICKET_ERROR',
          err,
        });
      });
  };
};

export const deleteTicket = (docId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    db.collection('tickets')
      .doc(docId)
      .delete()
      .then(() => {
        dispatch({
          type: 'DELETE_TICKET',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'DELETE_TICKET_ERROR',
          err,
        });
      });
  };
};
