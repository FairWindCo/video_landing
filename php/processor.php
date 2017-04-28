<?php
define('MESSAGE_PROCESSOR', 'C');
require 'lib/processor_lib.php';
$action=getRequestValue('action');
if($action=="message"){

	$key=getParamsPost('key');
	$data = array();
	if(!empty($key) && $key=='NKT-324DFGghdh56#$tryFDGDF') {




		$name=getParamsPost('name');
		$email=getParamsPost('email');
		$phone=getParamsPost('phone');
		$comment=getParamsPost('comment');
		$obj_id=getParamsPost('object_id');
		$price=getParamsPost('price');

		$smtp_Subject = 'Here is the subject';
		$smtp_Body = <<<MESSAGE_HTML
Клиент <b>{$name}</b> 
интересуется продуктом <b>{$obj_id}</b> 
по цене <i>{$price}</i><br> 
Контактные данные<br> 
Телефон: {$phone}<br>
E-Mail: {$email}<br>
{$comment};
MESSAGE_HTML;

		$smtp_AltBody = <<<MESSAGE
Клиент {$name} 
интересуется продуктом {$obj_id}
по цене {$price} 
Контактные данные
Телефон: {$phone}
E-Mail: {$email}
{$comment};
MESSAGE;

		$data=sendMail($smtp_Subject,$smtp_Body,$smtp_AltBody);

	} else {
	  $data['message'] = 'Сообщение не было отправленно';
	  $data['error'] = 'Ошибка Mailer: ' . ' Correct Key not found!';
	}
} else {
  $data['message'] = 'Сообщение не было отправленно';
  $data['error'] = 'Ошибка: ' . ' Неверное действие!';
}	

print_result($data);
