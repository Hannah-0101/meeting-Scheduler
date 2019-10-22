<?php
$con = mysqli_connect("localhost","root","","meeting_schedule");

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
      $id = $_GET['email'];
      $password = $_GET['password'];
      //$password = $_GET['password'];
      $sql = "SELECT * FROM user WHERE `email` = '$id' AND `password` = '$password' "; 
      //$sql = "SELECT * FROM contacts WHERE email = '$id' "; 
      break;
    case 'POST':
      $title = $_POST["title"];
      $rank = $_POST["rank"];
      $first_name =$_POST["first_name"];
      $last_name =$_POST["last_name"];
      $other_name =$_POST["other_name"];
      $email = $_POST["email"];
      $department = $_POST["department"];


      // $sql = "insert into meeting_schedule (first_name, email, city, country, job) values ('$name', '$email', '$city', '$country', '$job')";
      $sql = "insert into user (title,rank,first_name,last_name,other_name, email,password, department,image_name,image_tmp,created_at,updated_at) values ('$title','$rank','$first_name','$last_name','$other_name', '$email', '$password', '$department','$avatar_name','$avatar_path','$time','$time')"; 
      break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
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