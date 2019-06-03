const admin = require('./config')

exports.getPosts = async function(userId) {
  try {
    const snapshot = await admin.database().ref('/posts').orderByChild('uid').equalTo(userId).once('value');
    let val = snapshot.val();
    if (val === null) { return []; }
    val =  Object.keys(val).map(key => val[key]);
    return val;
  } catch (err) {
    return [];
  }
}

exports.getPost = async function(postId) {
  try {
    const snapshot = await admin.database().ref(`/posts/${postId}`).once('value');
    return snapshot.val();
  } catch (err) {
    return null;
  }
}

exports.getUser = async function(userId) {
  try {
    const snapshot = await admin.database().ref(`/users/${userId}`).once('value');
    return snapshot.val();
  } catch (err) {
    return null;
  }
}

exports.getOpenuser = async function(userId) {
  try {
    const snapshot = await admin.database().ref(`/openusers/${userId}`).once('value');
    return snapshot.val();
  } catch (err) {
    return null;
  }
}

exports.setPost = async function(data) {
  try {
    await admin.database().ref(`/posts/${data.postId}`).set(data);
    return true;
  } catch (err) {
    return false;
  }
}

exports.setUser = async function(data) {
  try {
    await admin.database().ref(`/users/${data.uid}`).set(data);
    return data;
  } catch (err) {
    return null;
  }
}

exports.setOpenuser = async function(data) {
  try {
    await admin.database().ref(`/openusers/${data.uid}`).set(data);
    return true;
  } catch (err) {
    return false;
  }
}

exports.deletePost = async function(postId) {
  try {
    await admin.database().ref(`/posts/${postId}`).remove();
    return true;
  } catch (err) {
    return false;
  }
}

exports.deletePosts = async function(userId) {
  try {
    const snapshot = await admin.database().ref('/posts').orderByChild('uid').equalTo(userId).once('value');
    let updates = {};
    snapshot.forEach(child => updates[child.key] = null);
    await admin.database().ref('/posts').update(updates);
    return true;
  } catch (err) {
    return false;
  }
}

exports.deleteUser = async function(userId) {
  try {
    await admin.database().ref(`/users/${userId}`).remove();
    return true;
  } catch (err) {
    return false;
  }
}

exports.deleteOpenuser = async function(userId) {
  try {
    await admin.database().ref(`/openusers/${userId}`).remove();
    return true;
  } catch (err) {
    return false;
  }
}

exports.updatePost = async function(data) {
  try {
    await admin.database().ref(`/posts/${data.postId}`).update({
      updatedAt: Date(),
      message: data.message,
      requirement: data.requirement
    })
    return true;
  } catch (err) {
    return false;
  }
}
