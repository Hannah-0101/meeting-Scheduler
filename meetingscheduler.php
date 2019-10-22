<?php
include('config.php');

$id = '';

$con = mysqli_connect("localhost","root","","meeting_schedule");

//Access-Control Start

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods:*");
      header("Access-Control-Headers: *");    // cache for 1 day
      header("Acess-Control-Max-Age: 86400");
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

  $sql = "SELECT * FROM meeting"; 
  break;
  case 'POST': 
      $meeting_name = htmlentities($_POST["meeting_name"]);
      $chairman= htmlentities($_POST["chairman"]);
      $scheduler = htmlentities($_POST["scheduler"]);
      $date = $_POST["date"];
      $time = $_POST["time"];
      $room = $_POST["room"];
      $location = $_POST["location"];
      $agenda = $_POST["agenda"];
      $attendees = $_POST["attendees"];
    
//adding an  file to our database
      $response = array();
      $upload_dir = 'files/';
      $server_url = 'http://localhost/';

if($_FILES['file']){
  //file name
    $file_name = $_FILES["file"]["name"];
    //file link
    $file_tmp_name = $_FILES["file"]["tmp_name"];
    //sizee of file
    $filesize=$_FILES["file"]["size"];
    //checking for errors
    $error = $_FILES["file"]["error"];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
        $random_name = rand(1000,1000000)."-".$file_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if(move_uploaded_file($file_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );
              $file_path = $server_url."newcontact/".$upload_name;
        }
        else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }    

}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}
$time = date("Y/m/d h:i:sa");

      $sql = "INSERT INTO meeting ( meeting_name,chairman,scheduler,date,time,room,location,agenda,attendees,file_name,file_tmp,created_at,updated_at) values ('$meeting_name','$chairman','$scheduler','$date','$time', '$room', '$location', '$agenda','$attendees','$file_name','$file_path','$time','$time')"; 
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
  $mail->addAddress($attendees, $scheduler);     // Add a recipient
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

//Magic


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