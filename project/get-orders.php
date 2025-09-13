<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit();
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT order_details FROM orders WHERE user_id = ? ORDER BY order_date DESC LIMIT 8";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = json_decode($row['order_details'], true);
}

echo json_encode($orders);

$stmt->close();
$conn->close();
?>
