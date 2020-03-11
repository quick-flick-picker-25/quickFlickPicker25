// firebase.js
import firebase from 'firebase';
import 'firebase/database';



  const firebaseConfig = {
    apiKey: "AIzaSyAmkko3XAdO0l3amrDc4VMBv9e0xuCfEbo",
    authDomain: "quickflickpicker.firebaseapp.com",
    databaseURL: "https://quickflickpicker.firebaseio.com",
    projectId: "quickflickpicker",
    storageBucket: "quickflickpicker.appspot.com",
    messagingSenderId: "981312277648",
    appId: "1:981312277648:web:489979be7011747edd9c15"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;







