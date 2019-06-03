import * as firebase from './firebaseConfig';

export async function getUser(userId) {
  try {
    const getUser = firebase.functions.httpsCallable('getUser');
    const user = await getUser(userId);
    return user.data;
  } catch (err) {
    // ユーザーの取得に失敗しました
    return null;
  }
}

export async function getOpenuser(userId) {
  try {
    const getOpenuser = firebase.functions.httpsCallable('getOpenuser');
    const user = await getOpenuser(userId);
    return user.data;
  } catch (err) {
    // ユーザーの取得に失敗しました
    return null;
  }
}

export async function getPosts(userId) {
  try {
    const getPosts = firebase.functions.httpsCallable('getPosts');
    const posts = await getPosts(userId);
    return posts.data;
  } catch (err) {
    // 投稿の取得に失敗しました。
    return [];
  }
}

export async function setPost(data) {
  try {
    const setPost = firebase.functions.httpsCallable('getUser');
    const result = await setPost(data);
    return result.data;
  } catch (err) {
    // 投稿に失敗しました。
    return false;
  }
}

export async function setUser(data) {
  try {
    const setUser = firebase.functions.httpsCallable('setUser');
    const result = await setUser(data);
    return result.data;
  } catch (err) {
    // ユーザー情報の登録に失敗しました。
    return false;
  }
}

export async function deletePost(data) {
  try {
    const deletePost = firebase.functions.httpsCallable('deletePost');
    const result = await deletePost(data);
    return result.data;
  } catch (err) {
    // 投稿の削除に失敗しました。
    return false;
  }
}

export async function addPost(data) {
  try {
    const addPost = firebase.functions.httpsCallable('addPost');
    const result = await addPost(data);
    return result.data;
  } catch (err) {
    // ポストの追加に失敗しました。
    return false;
  }
}

// {postId: "", message: "", requirement: "", location: ""}
export async function updatePost(data) {
  try {
    const updatePost = firebase.functions.httpsCallable('updatePost');
    const result = await updatePost(data);
    return result.data;
  } catch (err) {
    // ポストの編集に失敗しました。
    return false;
  }
}
