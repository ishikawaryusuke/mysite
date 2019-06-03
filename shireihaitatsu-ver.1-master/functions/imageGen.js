const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(1200, 630)
const ctx = canvas.getContext('2d')

function strIns(str, idx, val){
  var res = str.slice(0, idx) + val + str.slice(idx);
  return res;
};

function fillTextLine (context, text, x, y) {
  const length = text.length;
  for (let i = 20; i < length; i += 21) {
    text = strIns(text, i, '\n');
  }
  var textList = text.split('\n');
  var lineHeight = context.measureText("あ").width;
  lineHeight += 10;
  textList.forEach(function(text, i) {
    context.fillText(text, x, y+lineHeight*i);
  });
};

const imageGen = function(req, message) {
  return new Promise((resolve, reject) => {
    loadImage('./assets/background.png').then((image) => {
      ctx.drawImage(image, 0, 0)

      ctx.font = '35px Impact'
      ctx.textAlign = "center"
      ctx.fillText(req, canvas.width / 2, 170)
      const text = message
      fillTextLine(ctx, text, canvas.width/2, 330);

      const buf = canvas.toBuffer()
      resolve(buf);
    })
  });
}

module.exports = imageGen;
