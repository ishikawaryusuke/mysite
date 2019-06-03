export async function tweetPost(postId) {
  const url = encodeURIComponent(`${location.protocol}//${location.host}/image/${postId}`);
  const txt = encodeURIComponent('指令を受けました！ #指令配達');
  const twUrl = `https://twitter.com/intent/tweet?text=${txt}&url=${url}`;
  return twUrl
}