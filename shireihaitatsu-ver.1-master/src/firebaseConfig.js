import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBh3lUD0sz1ZyP1CtOouW21GgdUfvfjgR4",
  authDomain: "shirei-haitatsu1.firebaseapp.com",
  databaseURL: "https://shirei-haitatsu1.firebaseio.com",
  projectId: "shirei-haitatsu1",
  storageBucket: "shirei-haitatsu1.appspot.com",
  messagingSenderId: "1023194193698"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const functions = firebase.app().functions('asia-northeast1');
