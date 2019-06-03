const userDataGen = function(data) {
  switch (data.additionalUserInfo.providerId) {
    case "google.com":
      return {
        createdAt: Date(),
        updatedAt: Date(),
        loginAt: Date(),
        uid: data.user.uid,
        name: data.additionalUserInfo.profile.name,
        avatarUrl: data.additionalUserInfo.profile.picture,
        accessToken: '',
        secret: '',
        twitterId: ''
      }
    case "twitter.com":
      return {
        createdAt: Date(),
        updatedAt: Date(),
        loginAt: Date(),
        uid: data.user.uid,
        name: data.additionalUserInfo.profile.name,
        avatarUrl: data.additionalUserInfo.profile.profile_image_url_https,
        accessToken: data.credential.accessToken,
        secret: data.credential.secret,
        twitterId: data.additionalUserInfo.profile.id_str
      }
  }
}

export default userDataGen;
