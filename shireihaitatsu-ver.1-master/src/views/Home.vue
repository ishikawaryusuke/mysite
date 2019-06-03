<template>
<div>
  <h1>指令配達</h1>

  <div class="form-wrapper">
    <p>指令配達はSNSでイタズラできるサービスです。</p>
    <p>SNSで指令を受け実行したり、指令を送って実行させよう！</p>
    <img class="a" src="../assets/shirei.png">
    <form>
      <div class="button-panel1">
        <button type="button" class="button1" @click="twitter"><span class="fab fa-twitter"></span>Twitterでログイン</button>
      </div>
      <button class="google_btn" type="button" @click="google">
        <i class="fab fa-google"></i><span>Googleでログイン</span>
      </button>
    </form>
  </div>

  <div class="popup" id="js-popup">
    <div class="popup-inner">
      <div class="close-btn" id="js-close-btn"><i class="fas fa-times"></i></div>
      <a href="#"><img src="../assets/homepopup.png" alt="ポップアップ画像"></a>
    </div>
    <div class="black-background" id="js-black-bg"></div>
  </div>

  <button class="pop" id="js-show-popup">使い方</button>

  <div class="center">
    <p>1、Myポストを作って指令を募集</p>
    <p>2、送られてきた指令を拡散（twitterに画像付きで投稿できます）</p>
    <p>3、条件達成したら指令を実行する</p>
  </div>

  <div class="footer">
    <a href="toiawase.html">お問い合わせフォーム</a>
    <a href="https://twitter.com/shireihaitatsu">公式twitter</a>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'home',
  methods: {
    twitter: async function() {
      let provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    google: function() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  },
  mounted() {
    function popupImage() {
    var popup = document.getElementById('js-popup');
    if(!popup) return;

    var blackBg = document.getElementById('js-black-bg');

    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');
    var showBtn = document.getElementById('js-show-popup');

    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
    function closePopUp(elem) {
      if(!elem) return;
      elem.addEventListener('click', function() {
        popup.classList.toggle('is-show');
      });
    }
  }
  popupImage();
  }
}
</script>

<style scoped>
    body {
        background-color: #EEEE;

    }
    h1 {
        text-align: center;
    }
    
    form {
  
        margin-bottom: 0.75em;
  width: 100%;
}
.form-wrapper {
  background:pink;
  margin: 2em auto;
  padding-top:10px ;
  max-width: 530px;
  padding-bottom: 90px;
}
    
    .form-wrapper p {
        text-align: center;
        color: #444444;
        font-weight: 800;
    }
    

button-panel1 {
  margin: 2em 0 0;
  width: 100%;
}

.button-panel1 .button1 {
  background: #55acee;
  border-radius: 7px;/*角丸に*/
  border: none;
  color: #fff;
  cursor: pointer;
  height: 45px;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  transition: background 0.3s ease-in-out;
  width: 45%;
  margin-top : 10px;
    margin-left: 160px;
}

.button1 .fa-twitter{/*アイコン*/
  font-size: 30px;/*アイコンサイズ*/
  position: relative;
  top: 4px;/*アイコン位置の微調整*/
}

.button1:hover {
    color:#dddddd;
  background-color:#68a5da;
}


     .a {
        margin-left: 120px;
        width: 300px;
        height: 300px;
    }

.footer {
        background: #EEEE;
    margin: 3em auto;
  padding-top:10px ;
  max-width: 540px;
    
    }
    .center {
        background: white;
    margin: 3em auto;

  max-width: 540px;
    }
    .google_btn {
 background:red;
 border-radius: 7px;
 border: none;
 color: #fff;
 cursor: pointer;
 height: 45px;
 font-family: 'Open Sans', sans-serif;
 font-size: 1.2em;
 letter-spacing: 0.05em;
 text-align: center;
 transition: background 0.3s ease-in-out;
 width: 45%;
 margin-top : 10px;
    margin-left: 160px;
}

.google_btn .fa-google{
 font-size: 26px;
 position: relative;
 top: 4px;
}

.google_btn:hover {
   color:#dddddd;
 background-color:brown;
}

 .popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: .6s;
}
.popup.is-show {
  opacity: 1;
  visibility: visible;
}
.popup-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 80%;
  max-width: 600px;
  padding: 50px;
  background-color: #fff;
  z-index: 2;
}
.popup-inner img {
  width: 100%;
}
.close-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.close-btn i {
  font-size: 20px;
  color: #333;
}
.black-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.8);
  z-index: 1;
  cursor: pointer;
}

.pop {
 background:pink;
 border-radius: 10px;
 border: none;
 color: #fff;
 cursor: pointer;
 height: 45px;
 font-family: 'Open Sans', sans-serif;
 font-size: 1.2em;
 letter-spacing: 0.05em;
 text-align: center;
 transition: background 0.3s ease-in-out;
 width: 20%;
    margin-left: 490px;
}
@media screen and ( max-width:750px )
{

    button-panel1 {
  margin: 2em 0 0;
  width: 100%;
}

.button-panel1 .button1 {
  background: #55acee;
  border-radius: 7px;/*角丸に*/
  border: none;
  color: #fff;
  cursor: pointer;
  height: 45px;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  transition: background 0.3s ease-in-out;
  width: 60%;
  margin-top : 10px;
    margin-left: 100px;
}
        .google_btn {
 background:red;
 border-radius: 7px;
 border: none;
 color: #fff;
 cursor: pointer;
 height: 45px;
 font-family: 'Open Sans', sans-serif;
 font-size: 1.2em;
 letter-spacing: 0.05em;
 text-align: center;
 transition: background 0.3s ease-in-out;
 width: 60%;
 margin-top : 10px;
    margin-left: 100px;
}
    .a {
        margin-left: 60px;
        width: 300px;
        height: 300px;
    }
    .form-wrapper p {
        text-align: center;
        color: #444444;
        font-weight: 800;
        font-size: 14px;
    }
}

.pop {
 background:pink;
 border-radius: 10px;
 border: none;
 color: #fff;
 cursor: pointer;
 height: 45px;
 font-family: 'Open Sans', sans-serif;
 font-size: 1.2em;
 letter-spacing: 0.05em;
 text-align: center;
 transition: background 0.3s ease-in-out;
 width: 20%;
    margin-left: 190px;
}
</style>
