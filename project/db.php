<?php
$host = "localhost";
$user = "root";  // Change if you have a different username
$password = "";  // Change if you set a MySQL password
$dbname = "custom_coffee_maker";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
