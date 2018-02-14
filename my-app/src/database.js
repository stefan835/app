import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAdVZm8nb42HMUPbfM0HbA8S_TFhypI-Lk",
  authDomain: "shopping-list-835.firebaseapp.com",
  databaseURL: "https://shopping-list-835.firebaseio.com",
  projectId: "shopping-list-835",
  storageBucket: "",
  messagingSenderId: "741340477874"
};
firebase.initializeApp(config);

const database = firebase.database();

export default database