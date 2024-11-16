import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC7dEMPkut0b56cH6eK6w8hHEh9DAMWmPc",
  authDomain: "prog3rnpeleritti.firebaseapp.com",
  projectId: "prog3rnpeleritti",
  storageBucket: "prog3rnpeleritti.firebasestorage.app",
  messagingSenderId: "1080603043364",
  appId: "1:1080603043364:web:8c99625e732c4086241ab1"
};
app.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
