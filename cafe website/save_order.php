<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 1. Establish connection details to your XAMPP MySQL Database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cafe_db"; // Using your active database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection failed
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// 2. Capture the JSON order packet sent from your menu webpage
$incomingData = json_decode(file_get_contents("php://input"), true);

if (!empty($incomingData['table']) && !empty($incomingData['items'])) {
    $table = $conn->real_escape_string($incomingData['table']);
    $items = $conn->real_escape_string(json_encode($incomingData['items']));
    $total = isset($incomingData['total']) ? (float) $incomingData['total'] : 0.00;

    // 3. Securely insert the data into your new customer_orders table
    $sql = "INSERT INTO customer_orders (table_identifier, items_json, grand_total) VALUES ('$table', '$items', '$total')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Order saved successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "SQL Error: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Incomplete order data received."]);
}

$conn->close();
?>