import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDATHN2QEmYkIQ2dj3QCGfZDvlU5ikhuiQ",
    authDomain: "whats-app-clone-3a0ef.firebaseapp.com",
    databaseURL: "https://whats-app-clone-3a0ef.firebaseio.com",
    projectId: "whats-app-clone-3a0ef",
    storageBucket: "whats-app-clone-3a0ef.appspot.com",
    messagingSenderId: "812436557895",
    appId: "1:812436557895:web:73e54e4bfa3bcbd7116162",
    measurementId: "G-FSH8D0GX3J"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;