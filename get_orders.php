<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cafe_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode([]);
    exit();
}

// Grab all incoming customer rows that haven't been completed yet
$result = $conn->query("SELECT * FROM customer_orders WHERE order_status = 'Incoming' ORDER BY id DESC");
$orders = [];

while ($row = $result->fetch_assoc()) {
    $row['items'] = json_decode($row['items_json'], true);
    $orders[] = $row;
}

echo json_encode($orders);
$conn->close();
?>