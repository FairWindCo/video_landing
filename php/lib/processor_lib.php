<?php
if (!defined('MESSAGE_PROCESSOR')) { die('Access denied'); }


require 'lib/mailer/PHPMailerAutoload.php';
require 'config.php';


function getClientIP(){
  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    return $_SERVER['HTTP_CLIENT_IP'];
  } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    return $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else {
    return $_SERVER['REMOTE_ADDR'];
  }
}

function getParams($name,$param_array){
  if(array_key_exists($name,$param_array)){
    return $param_array[$name];
  } else {
    return '';
  }
}

function getParamsPost($name){
  return getParams($name,$_POST);
}

function getRequestValue($name){
	if(array_key_exists($name,$_POST)){
		return $_POST[$name];
	} else if(array_key_exists($name,$_GET)){
		return $_GET[$name];
	} else {
		return '';
	}
}

function checkRequestValue($name){
	if(array_key_exists($name,$_POST)){
		return true;
	} else if(array_key_exists($name,$_GET)){
		return true;
	} else {
		return false;
	}
}


function sendMail($subject,$text,$alt_text,$recipients,$copy_to=true){
	global $config;
	$mail = new PHPMailer;

	if($config['smtp_use']){
		$mail->isSMTP();                    // Set mailer to use SMTP
		$mail->Host = $config['smtp_host'];  			// Specify main and backup SMTP servers
		$mail->SMTPAuth = $config['smtp_auth'];       // Enable SMTP authentication
		$mail->Username = $config['smtp_user'];       // SMTP username
		$mail->Password = $config['smtp_pass'];       // SMTP password
		$mail->SMTPSecure = $config['smtp_secure'];   // Enable TLS encryption, `ssl` also accepted
		$mail->Port = $config['smtp_port'];
	} else {
		$mail->isMail();
	}
	$mail->isHTML(true);                    // Set email format to HTML

	$mail->setFrom($config['smtp_mail_from'], 'Mailer');

	if(!empty($recipients)){
		if(is_array()){
			foreach($recipients as $address) {
				$mail->addAddress($address);
			}
		} else {
			$mail->addAddress($recipients);
		}
	}

	if($copy_to && !empty($config['smtp_copy_to'])){
		$mail->addCC($config['smtp_copy_to']);
	}

	$mail->Subject =$subject;
	$mail->Body =$text;
	$mail->AltBody =$alt_text;

	$data = array();
	if (!$mail->send()) {
		$data['message'] = 'Сообщение не было отправленно';
		$data['error'] = 'Ошибка Mailer: ' . $mail->ErrorInfo;
	} else {
		$data['message'] = 'Сообщение успешно отправленно!';
		$data['text'] = 'Менеджер свяжется с Вами в ближайщее время';

	}
	return $data;
}

function print_result($data,$header=false){
	global $config;
	$data['link']=$config['link'];
	$data['link_text']=$config['link_text'];
	if(checkRequestValue('ajax')){
		if($header) header('Content-Type: application/json');
		echo json_encode($data);
	} else {
		if($header) header('Content-Type: text/html');
		echo <<<HTML
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" media="all" type="text/css" href="css/style.css" >
    <title>{$config['title']}</title>
</head>
<body>	
  <div class="modal--content dialogWindow">
    <div class="dialogWindow--header">{$data['header']}</div>
	<p class="dialogWindow--message">{$data['message']}</p>
	<p class="dialogWindow--text">{$data['text']}</p>
    <p class="dialogWindow--error">{$data['error']}</p>
	<a class="formBtn dialogWindow--link" href="{$data['link']}">{$data['link_text']}</a>
  </div>
</body>
</html>		
HTML;
	}
}

function MySQL_Stat($typeStat,$clientID,$clientHash,$subType,$text){
  global $config;
  $clientIP=getClientIP();
  $mysqli = mysqli_connect($config['db_host'], $config['db_user'] , $config['db_password'], $config['db_name']);
  if (mysqli_connect_errno($mysqli)) {
    error_log( "Failed to connect to MySQL: " . mysqli_connect_error());
    return;
  }
  $result = $mysqli->query("SHOW TABLES LIKE '".$config['db_table']."'");
  if (!$result || $result->num_rows != 1) {
    $createSQL=<<<C_SQL
    CREATE TABLE {$config['db_table']} IF NOT EXISTS(
      stat_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      stat_type INT(3),
      client_ip VARCHAR(25),
      client_id VARCHAR(150),
      client_hash INT(12),
      sub_type VARCHAR(25),
      info VARCHAR(255)
    );
C_SQL;


    $result=$mysqli->query($createSQL);
  }
  if($result){
    if (($stmt = $mysqli->prepare("INSERT INTO '".$config['db_table']."'(stat_type,client_ip,client_id,client_hash,sub_type,info) VALUES(?,?,?,?,?,?)"))) {
      if (!$stmt->bind_param("ississ", $typeStat,$clientIP,$clientID,$clientHash,$subType,$text)) {
        error_log("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
      } else {
        if(!$stmt->execute()){
          error_log( "Failed to connect to MySQL: " . $mysqli->error);
        }
      }
      $stmt->close();
    } else {
      error_log("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
    }

  } else {
    error_log( "NO TABLE " . $config['db_table']);
  }
  $mysqli->close();
}

?>
