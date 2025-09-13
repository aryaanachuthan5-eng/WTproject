<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "Unauthorized";
    exit();
}

$user_id = $_SESSION['user_id'];
$order_details = json_encode($_POST['order']);  // Convert order to JSON

// Insert the new order
$sql = "INSERT INTO orders (user_id, order_details) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $user_id, $order_details);
$stmt->execute();

// Keep only the last 8 orders per user
$sql = "DELETE FROM orders WHERE user_id = ? AND id NOT IN 
       (SELECT id FROM (SELECT id FROM orders WHERE user_id = ? ORDER BY order_date DESC LIMIT 8) temp)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $user_id);
$stmt->execute();

echo "Order saved";

$stmt->close();
$conn->close();
?>
