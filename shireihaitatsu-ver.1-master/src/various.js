import store from './store';
import * as request from './request';
import userDataGen from './userDataGen';
import * as firebase from './firebaseConfig'


export async function signup(data) {
  try {
    const sendData = userDataGen(data);
    const result = await request.setUser(sendData);
    store.commit('changeUser', result);
    return true;
  } catch (err) {
    return false;
  }
}

export function auth() {
  return new Promise((resolve, reject) => {
    firebase.auth.onAuthStateChanged(function (user) {
      resolve(user)
    });
  })
}

export function onAuth() {
  return new Promise(async (resolve, reject) => {
    const user = await auth();
    if (!user) { return resolve() }
    await store.dispatch('setUser', { uid: user.uid })
    resolve()
  });
}

export function onRedirect() {
  return new Promise(async (resolve, reject) => {
    firebase.auth.getRedirectResult().then(async (result) => {
      if (!store.getters.getIsUser) {
        if (result.user && result.additionalUserInfo.isNewUser) {
          await signup(result);
        }
      }
      resolve();
    });
  })
}