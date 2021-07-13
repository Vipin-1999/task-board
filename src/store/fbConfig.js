import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDXjJZTALDmHheygB16WILDFElFGH-RWCY',
  authDomain: 'todo-list-board.firebaseapp.com',
  projectId: 'todo-list-board',
  storageBucket: 'todo-list-board.appspot.com',
  messagingSenderId: '677600242895',
  appId: '1:677600242895:web:6dfdacb046a2f0b18c1bba',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth };
export { db };
export { firebaseConfig };
