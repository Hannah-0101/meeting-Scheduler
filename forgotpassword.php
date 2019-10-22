<?php
$id = '';
$con = mysqli_connect("localhost","root","","meeting_schedule");
include('config.php');
//Access-Control Start

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

      exit(0);
  }

  //Access-Control End

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
    case 'GET':
    // $id = $_GET['user'];
    // $sql = "select * from contacts".($id?" where id=$id":''); 
    $sql = "SELECT * FROM user"; 
    break;
      case 'POST':
        $email = $_POST["email"];
        
        function randomPassword() {
          $alphabet = "abcdefghjklmnpqrstuwxyzABCDEFGHJKLMNPQRSTUWXYZ123456789@";
          $pass = array(); //remember to declare $pass as an array
          $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
          for ($i = 0; $i < 10; $i++) {
              $n = rand(0, $alphaLength);
              $pass[] = $alphabet[$n];
          }
          return implode($pass); //turn the array into a string
      }
  
      $pass = randomPassword();
      $hash = md5($pass);
         $time = date("Y/m/d h:i:sa");

         $sql = "UPDATE `user` SET `password` = '$hash' WHERE `email` = '$email' ";
  //inserting data from our UI to our database...
  break;
    // $sql = "insert into contacts (name, email, city, country, job, password, imagename, imagetmp, time_stamp) values ('$name', '$email', '$city', '$country', '$job', '$password', '$file_basename', '$final_dir', '$time')"; 
        // break;
  }

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
else{
    require 'PHP_Mailer/PHPMailerAutoload.php';
    require 'credential.php';

    
    $mail = new PHPMailer;
    
    //$mail->SMTPDebug = 3;                               // Enable verbose debug output
    
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.mailtrap.io';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = '17b8a287b2cc6a';                 // SMTP username
    $mail->Password = '3f88f93a35967e';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = '2525';                                    // TCP port to connect to
    
    $mail->setFrom(EMAIL, 'Mailer');
    $mail->addAddress($email, $first_name);     // Add a recipient
    $mail->isHTML(true);                                  // Set email format to HTML
    
    $mail->Subject = 'Meeting Schedule';
    $mail->Body    = 'Your password reset link is <a href="#">here</a>';
    $mail->AltBody = '';
    
    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}

if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

$con->close();