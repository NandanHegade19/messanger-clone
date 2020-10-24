import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBNDPh-prPUazIyWncoBTWpiMa83Sozgds",
        authDomain: "messanger-clone-5e30b.firebaseapp.com",
        databaseURL: "https://messanger-clone-5e30b.firebaseio.com",
        projectId: "messanger-clone-5e30b",
        storageBucket: "messanger-clone-5e30b.appspot.com",
        messagingSenderId: "66184029696",
        appId: "1:66184029696:web:526da127d6af181a915ae5"
});

const db = firebaseApp.firestore();

export default db;