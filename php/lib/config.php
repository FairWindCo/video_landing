<?php
if (!defined('MESSAGE_PROCESSOR')) { die('Access denied'); }

error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set maximum memory limit
if (PHP_INT_SIZE == 4 && (substr(ini_get('memory_limit'), 0, -1) < "64")) {
  // 32bit PHP
  @ini_set('memory_limit', '64M');
} elseif (PHP_INT_SIZE == 8 && (substr(ini_get('memory_limit'), 0, -1) < "256")) {
  // 64bit PHP
  @ini_set('memory_limit', '256M');
}

if (!defined('CONSOLE')) {
    // Set maximum time limit for script execution.
    @set_time_limit(3600);
}
$config = array();
// Параметры для подключения
$config['db_host'] = "localhost";
$config['db_user'] = "user"; // Логин БД
$config['db_password'] = "123"; // Пароль БД
$config['db_table'] = "mytable"; // Имя Таблицы БД
$config['db_name'] = ""; // Имя БД

$config['smtp_host']='smtp.gmail.com'; //Хост сервера
$config['smtp_use']=false;
$config['smtp_port']=587;                                    // TCP port to connect to
$config['smtp_secure']='tls';
$config['smtp_auth']=true;
$config['smtp_user']='s.manenok@nkt.kiev.ua';
$config['smtp_pass']='q1A!s2W@d3E#';
$config['smtp_mail_from']='mailer@nkt.kiev.ua';
$config['smtp_copy_to']='777@nkt.kiev.ua';

$config['title'] = "Система обработки сообщение НКТ";
$config['link'] = "http://localhost/12/";
$config['link_text'] = "далее";



?>
