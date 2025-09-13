<?php
session_start();

// Redirect if user not logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.html");
    exit();
}

// DB connection
$host = "localhost";
$user = "root";  
$password = "";  
$dbname = "custom_coffee_maker";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch last 8 orders for this user
$username = $_SESSION['username'];
$sql = "SELECT coffee_type, size, sugar, milk, created_at 
        FROM orders 
        WHERE username = ? 
        ORDER BY created_at DESC 
        LIMIT 8";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}
$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Order History</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h2>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
        <h3>Your Recent Orders</h3>

        <?php if (count($orders) > 0): ?>
            <table border="1" cellpadding="8">
                <tr>
                    <th>Coffee Type</th>
                    <th>Size</th>
                    <th>Sugar</th>
                    <th>Milk</th>
                    <th>Date</th>
                </tr>
                <?php foreach ($orders as $order): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($order['coffee_type']); ?></td>
                        <td><?php echo htmlspecialchars($order['size']); ?></td>
                        <td><?php echo htmlspecialchars($order['sugar']); ?></td>
                        <td><?php echo htmlspecialchars($order['milk']); ?></td>
                        <td><?php echo htmlspecialchars($order['created_at']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php else: ?>
            <p>No orders found.</p>
        <?php endif; ?>

        <form method="post" action="logout.php">
            <button type="submit">Logout</button>
        </form>
    </div>
</body>
</html>
