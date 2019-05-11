<?php
session_start();
$db['host'] = "localhost";  // DBサーバのURL
$db['user'] = "root";  // ユーザー名
$db['pass'] = "";  // ユーザー名のパスワード
$db['dbname'] = "board_test";  // データベース名
?>
 
<?php
 
/* DSN組み立て */
$dsn = sprintf('mysql: host=%s; dbname=%s; charset=utf8', $db['host'], $db['dbname']);
 
/* データベース接続 */
try{
  /* データベース接続 */
  $pdo = new PDO($dsn, $db['user'], $db['pass']);
  /* エラーモード設定 */
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
}catch(PDOException $Exception){
  /* エラーメッセージ */
  die('接続エラー:'.$Exception->getMessage());
}
?>
