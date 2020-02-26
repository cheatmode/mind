<?php
var $fullname = $_POST['fullname'];
var $phone = $_POST['phone'];
var $body = $_POST['msg'];

require 'PHPMailer-5.2-stable/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->setFrom('noreply@mind-hunter.ru', 'MIND');
$mail->addAddress('89263584512@mail.ru', 'Denis');     // Add a recipient
$mail->addReplyTo('noreply@mind-hunter.ru', 'MIND');
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Сообщение с mind-hunter.ru';
$mail->Body    = '<p>Имя: '.$fullname.'</p><p>Телефон: '.$phone.'</p><p>'.$body.'</p>';
$mail->AltBody = $fullname.'\n'.$phone.'\n'.$body.'\n';

if(!$mail->send()) {
    return 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
} else {
    return 'Сообщение отправлено. Наш оператор свяжется с Вами';
}