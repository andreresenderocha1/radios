import firebase from 'firebase';

const DB_CONFIG = {
    apiKey: "AIzaSyANSv5TdnsHMOLpaKml7MWArEtNwksVY7Y",
    authDomain: "radiosbrasil-4e33f.firebaseapp.com",
    databaseURL: "https://radiosbrasil-4e33f.firebaseio.com",
    projectId: "radiosbrasil-4e33f",
    storageBucket: "radiosbrasil-4e33f.appspot.com",
    messagingSenderId: "501016301056",
    appId: "1:501016301056:web:bc0fea0f8a5f84b288d2e5",
    measurementId: "G-JFJDKWSHQ5"
  };

  export default firebase.initializeApp(DB_CONFIG);


  