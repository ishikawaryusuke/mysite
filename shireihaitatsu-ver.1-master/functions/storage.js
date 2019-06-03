const admin = require('./config');

exports.setImage = async function(location, data) {
  const file = admin.storage().bucket().file(location);
  try {
    await file.save(data);
    await file.setMetadata({ contentType: 'image/png' });
    const signedUrl = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
    return signedUrl[0];
  } catch (err) {
    return '';
  }
}

exports.deleteImage = async function(location) {
  try {
    if (location === '') { return true; } // 運営投稿用
    await admin.storage().bucket().file(location).delete();
    return true;
  } catch (err) {
    return false;
  }
}

// exports.updateImage = async function(location, data) {
//   const file = admin.storage().bucket().file(location);
//   try {
//     await file.save(data);
//     await file.setMetadata({ contentType: 'image/png' });
//     const signedUrl = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
//     return signedUrl[0];
//   } catch (err) {
//     return '';
//   }
// }