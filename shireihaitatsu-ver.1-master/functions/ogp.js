const SITEURL = 'https://shirei-haitatsu1.firebaseapp.com/';
const OGP_IMG_WIDTH = 1200;
const OGP_IMG_HEIGHT = 630;

exports.createUserHtml = async (userId, name) => {
  const IMGURL = 'https://firebasestorage.googleapis.com/v0/b/shirei-haitatsu1.appspot.com/o/post_images%2Fapp_ogp.jpg?alt=media&token=7c8c4ce8-0c8f-42f9-a294-78178501c1a4';
  const PAGEURL = `${SITEURL}/user/${userId}`;
  const TITLE = `${name}です。`;
  const DESCRIPTION = 'どんどん指令してください！';
  const content =  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>指令配達</title>
        <meta property="og:title" content="${TITLE}">
        <meta property="og:image" content="${IMGURL}">
        <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
        <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
        <meta property="og:description" content="${DESCRIPTION}">
        <meta property="og:url" content="${PAGEURL}">
        <meta property="og:type" content="article">
        <meta property="og:site_name" content="指令配達">
        <meta name="twitter:site" content="${SITEURL}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${TITLE}">
        <meta name="twitter:image" content="${IMGURL}">
        <meta name="twitter:description" content="${DESCRIPTION}">
      </head>
      <body>
        <script type="text/javascript">window.location="/${userId}";</script>
      </body>
    </html>
  `;
  return content;
}

exports.createPostHtml = async (uid, imgUrl, postId) => {
  const IMGURL = imgUrl;
  const PAGEURL = `${SITEURL}/image/${postId}`;
  const TITLE = `指令配達`;
  const DESCRIPTION = '指令を受けました！';
  const content =  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>指令配達</title>
        <meta property="og:title" content="${TITLE}">
        <meta property="og:image" content="${IMGURL}">
        <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
        <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
        <meta property="og:description" content="${DESCRIPTION}">
        <meta property="og:url" content="${PAGEURL}">
        <meta property="og:type" content="article">
        <meta property="og:site_name" content="指令配達">
        <meta name="twitter:site" content="${SITEURL}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${TITLE}">
        <meta name="twitter:image" content="${IMGURL}">
        <meta name="twitter:description" content="${DESCRIPTION}">
      </head>
      <body>
        <script type="text/javascript">window.location="/${uid}";</script>
      </body>
    </html>
  `;
  return content;
}
