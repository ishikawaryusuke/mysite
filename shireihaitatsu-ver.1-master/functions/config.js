const admin = require("firebase-admin");
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'shirei-haitatsu1.appspot.com',
  databaseURL: "https://shirei-haitatsu1.firebaseio.com"
});

module.exports = admin;
