<?php
define( "FILE_DIR", "images/test/"); #追加
// $isNameと$isContentが存在するとき
if(isset($isName, $isContent)){
  // 名前が空のとき
  if(!$isName){
    print '名前が入力されていません。<br>';
  }
  // 内容が空のとき
  if(!$isContent){
    print '内容が入力されていません。<br><br>';
  }
}
?>

<form name="post" method="post" action="index.php"　enctype="multipart/form-data">
  <input type="text" readonly name="name" value=<?=$_SESSION['NAME'] ?>><br>
  内容：<br>
  <textarea name="content" rows="3" cols="100"></textarea><br>
  <div class="button-panel">
      <input type="submit" value="送信">
    </div>
  <div class="element_wrap">　<!--追加-->
		<label>
		<input type="file" name="attachment_file">
        </label>
	</div> <!--追加-->
</form>
<a href="Main.php">戻る</a>


<style>
    .button-panel {
  margin: 2em 0 0;
  width: 100%;
}
.button-panel input {
  background: #FF66FF;
  border-radius: 7px;/*角丸に*/
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  transition: background 0.3s ease-in-out;
  width: 30%;
  margin-top : 10px;
}
.button-panel input:hover {
    color:#dddddd;
  background-color:#CC3399;
}
textarea {
        border:  solid #CC3399;  /* 枠線 */
    border-radius: 0.67em;   /* 角丸 */
              /* 内側の余白量 */
    background-color: snow;  /* 背景色 */
         
    }
.name{
    width:20%;
    height:10%;
    }
</style>
