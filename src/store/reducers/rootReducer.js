import ticketReducer from './ticketReducer';
import columnReducer from './columnReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  ticket: ticketReducer,
  columns: columnReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
