import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsaVXqBpbGKx6A9pkDtUw-b34J7YqZ_24",
  authDomain: "smarttravel-c016f.firebaseapp.com",
  projectId: "smarttravel-c016f",
  storageBucket: "smarttravel-c016f.appspot.com",
  messagingSenderId: "1056583241878",
  appId: "1:1056583241878:web:0164f066add974bbdf32b7",
  measurementId: "G-6DCE3M12H2",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
