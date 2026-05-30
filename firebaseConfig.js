import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Use your own Firebase config (from Firebase console)
const firebaseConfig = {
  apiKey: "AIza...yourkey...",
  authDomain: "yourproj.firebaseapp.com",
  projectId: "yourproj-id",
  storageBucket: "yourproj.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;