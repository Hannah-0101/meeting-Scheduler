
	<?php 
			require 'PHPMailerAutoload.php';

			$mail = new PHPMailer;

			 $mail->SMTPDebug = 4;                               // Enable verbose debug output
			 $to = "somebody@example.com";
			 $subject = "My subject";
			 $txt = "Hello world!";
			 $headers = "From: webmaster@example.com" . "\r\n" .
			 "CC: somebodyelse@example.com";
			 
			 mail($to,$subject,$txt,$headers);
	 ?>
	