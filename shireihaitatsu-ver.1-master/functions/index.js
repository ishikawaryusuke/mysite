const functions = require('firebase-functions');
const storage = require('./storage');
const database = require('./database');
const ogp = require('./ogp');
const imageGen = require('./imageGen');
const uuidv1 = require('uuid/v1');
const express = require('express');
const app = express();

const f = functions.region('asia-northeast1');

/*



HTTP



*/

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  let userVal = await database.getOpenuser(userId);
  let html = await ogp.createPostHtml();
  if (!userVal) {
    html = await ogp.createUserHtml('', '');
  } else {
    html = await ogp.createUserHtml(userVal.uid, userVal.name);
  }
  res.set('Cache-Control', 'public, max-age=600, s-maxage=600');
  res.status(200).send(html);
});

app.get('/image/:id', async (req, res) => {
  const postId = req.params.id;
  let postVal = await database.getPost(postId);
  let html;
  if (!postVal) {
    html = await ogp.createPostHtml('', '', '');
  } else {
    html = await ogp.createPostHtml(postVal.uid, postVal.imgUrl, postId);
  }
  res.set('Cache-Control', 'public, max-age=600, s-maxage=600');
  res.status(200).send(html);
});

exports.ogp = f.https.onRequest(app);

/*



Trigger



*/

// authの削除に合わせてDBからuserとopenuserとその人宛のpostsを消す
exports.deleteUser = f.auth.user().onDelete(async (user) => {
  const uid = user.uid;
  let result = await database.deleteUser(uid);
  if (!result) { return result; }
  result = await database.deleteOpenuser(uid);
  if (!result) { return result; }
  result = await database.deletePosts(uid);;
  return result; 
});

// postのデリートに合わせてストレージから画像を消す
exports.deleteImage = f.database.ref('/posts/{postId}').onDelete(async (snapshot) => {
  const val = snapshot.val();
  const result = await storage.deleteImage(val.location);
  return result;
});

// userの登録に合わせてopenuserも登録
exports.setOpenuser = f.database.ref('/users/{userId}').onCreate(async (snapshot) => {
  let val = snapshot.val();
  const data = {
    name: val.name,
    avatarUrl: val.avatarUrl,
    uid: val.uid
  };
  const result = await database.setOpenuser(data);
  return result;
});

// userの登録に合わせて指令を追加
exports.initPost = f.database.ref('/users/{userId}').onCreate(async (snapshot) => {
  let val = snapshot.val();
  const data = {
    createdAt: Date(),
    updatedAt: Date(),
    postId: uuidv1(),
    requirement: '10いいね',
    message: '指令配達をSNSで拡散',
    uid: val.uid,
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/shirei-haitatsu1.appspot.com/o/post_images%2F4233bc90-756e-11e9-b22d-e385fbf1a417.png?alt=media&token=fde93fa0-64b6-4272-a4d3-3950f64702f6',
    location: ''
  };
  const result = await database.setPost(data);
  return result;
});

/*



Callblefunctions



*/

// データベースからユーザー情報を取得
exports.getUser = f.https.onCall(async (userId, context) => {
  if (!userId) { return null }
  if (userId !== context.auth.uid) { return null }
  const val = await database.getUser(userId);
  return val;
});

// データベースからオープンユーザー情報を取得
exports.getOpenuser = f.https.onCall(async (userId, context) => {
  if (!userId) { return null }
  const val = await database.getOpenuser(userId);
  return val;
});

// データベースからuserIdでポスト情報を取得
exports.getPosts = f.https.onCall(async (userId, context) => {
  if (!userId) { return [] }
  if (userId !== context.auth.uid) { return [] }
  const val = await database.getPosts(userId);
  return val;
});

// データベースからpostIdでポスト情報を取得
exports.getPost = f.https.onCall(async (postId, context) => {
  if (!postId) { return null }
  const val = await database.getPost(postId);
  return val;
});

// ポストを登録（使用していない）
exports.setPost = f.https.onCall(async (data, context) => {
  const result = await database.setPost(data);
  return result;
});

// ユーザーデータを登録 (自動でオープンユーザーも登録するようにする)
exports.setUser = f.https.onCall(async (data, context) => {
  const result = await database.setUser(data);
  return result;
});

// ポスト削除
exports.deletePost = f.https.onCall(async (postId, context) => {
  const result = await database.deletePost(postId);
  return result;
});

// ポストを追加（画像のアップロードも行う）
exports.addPost = f.https.onCall(async (data, context) => {
  const imageData = await imageGen(data.requirement, data.message);
  const postId = uuidv1();
  data.postId = postId;
  data.location = `post_images/${postId}.png`;
  data.imgUrl = await storage.setImage(data.location, imageData);
  const result = await database.setPost(data);
  return result;
});

// ポストをアップデート
exports.updatePost = f.https.onCall(async (data, context) => {
  const imageData = await imageGen(data.requirement, data.message);
  await storage.setImage(data.location, imageData);
  const result = database.updatePost(data);
  return result;
});
