<?php
define('MESSAGE_PROCESSOR', 'C');
require_once 'lib/processor_lib.php';
$action=getRequestValue('action');
$key=getParamsPost('key');
$data = array();
if(!empty($key) && $key=='NKT-324DFGghdh56#$tryFDGDF') {
  $clientID = getParamsPost('clientId');
  $clientHash = getParamsPost('hash');
  if($action=="statistic") {
    $subtype = getParamsPost('actionType');
    $text = getParamsPost('info');
    MySQL_StatEX(0,$clientID,$clientHash,$subtype,$text);
  } else if($action=="call_request") {

    $name = getParamsPost('name');
    $phone = getParamsPost('phone');
    $comment = getParamsPost('comment');
    $obj_id = getParamsPost('object_id');

    $smtp_Subject = 'Запрос на обратный звонок';
    $smtp_Body = <<<MESSAGE_HTML1
Клиент <b>{$name}</b> 
интересуется продуктом <b>{$obj_id}</b> 
<br>Контактные данные<br> 
Имя: {$name}<br>
Телефон: {$phone}<br>
ClientID: {$clientID}<br>
ClientHASH: {$clientHash}<br>
{$comment};
MESSAGE_HTML1;

    $smtp_AltBody = <<<MESSAGE1
Клиент {$name} 
интересуется продуктом {$obj_id}
Контактные данные
Имя: {$name}
Телефон: {$phone}
ClientID: {$clientID}
ClientHASH: {$clientHash}
{$comment};
MESSAGE1;
    MySQL_StatEX(1,$clientID,$clientHash,"CALL",$smtp_AltBody);
    $data = sendMail($smtp_Subject, $smtp_Body, $smtp_AltBody);
  }else if($action=="mail_request") {
    $name = getParamsPost('name');
    $email = getParamsPost('email');
    $comment = getParamsPost('comment');
    $obj_id = getParamsPost('object_id');

    $smtp_Subject = 'Вопрос по продукту (e-mail)';
    $smtp_Body = <<<MESSAGE_HTML2
Клиент <b>{$name}</b> 
интересуется продуктом <b>{$obj_id}</b> 
<br>Контактные данные<br> 
Имя: {$name}<br>
E-Mail: {$email}<br>
ClientID: {$clientID}<br>
ClientHASH: {$clientHash}<br>
{$comment};
MESSAGE_HTML2;

    $smtp_AltBody = <<<MESSAGE2
Клиент {$name} 
интересуется продуктом {$obj_id}
Контактные данные
Имя: {$name}
E-Mail: {$email}
ClientID: {$clientID}
ClientHASH: {$clientHash}
{$comment};
MESSAGE2;
    MySQL_StatEX(2,$clientID,$clientHash,"MAIL",$smtp_AltBody);
    $data = sendMail($smtp_Subject, $smtp_Body, $smtp_AltBody);
  }else  if($action=="sold") {

    $name = getParamsPost('name');
    $phone = getParamsPost('phone');
    $comment = getParamsPost('comment');
    $obj_id = getParamsPost('object_id');
    $product = getParamsPost('soldItem');

    $smtp_Subject = 'Запрос на покупку (SOLD)';
    $smtp_Body = <<<MESSAGE_HTML3
Клиент <b>{$name}</b> 
интересуется продуктом <b>{$obj_id}</b><br> 
и хочет купить: <b>{$product}</b>
<br>Контактные данные<br> 
Имя: {$name}<br>
Телефон: {$phone}<br>
ClientID: {$clientID}<br>
ClientHASH: {$clientHash}<br>
{$comment};
MESSAGE_HTML3;

    $smtp_AltBody = <<<MESSAGE3
Клиент {$name} 
интересуется продуктом {$obj_id}
и хочет купить: {$product}
Контактные данные
Имя: {$name}
Телефон: {$phone}
ClientID: {$clientID}
ClientHASH: {$clientHash}
{$comment};
MESSAGE3;
    MySQL_StatEX(3,$clientID,$clientHash,"SOLD",$smtp_AltBody);
    $data = sendMail($smtp_Subject, $smtp_Body, $smtp_AltBody);

  } else {
    $data['message'] = 'Сообщение не было отправленно';
    $data['error'] = 'Ошибка: ' . ' Неверное действие!';
	}
} else {
  $data['message'] = 'Сообщение не было отправленно';
  $data['error'] = 'Ошибка Mailer: ' . ' Correct Key not found!';
}

print_result($data);
