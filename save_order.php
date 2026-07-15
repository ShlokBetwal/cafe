<?php
// 🔓 ALLOW FRONTEND TO CONNECT CLEANLY
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 📡 CONNECTION CREDS
$servername = "bvhujbzywochddf20hir-mysql.services.clever-cloud.com";
$username = "usbzg45wtej4xap";
$password = "XfZ3BBYK48HJGHcqJITO"; // <-- MAKE SURE YOUR ACTUAL PASSWORD IS HERE
$dbname = "bvhujbzywochddf20hir";
$port = 3306;

$conn = new mysqli($servername, $username, $password, $dbname, $port);

// 🔍 CHECK CONNECTION
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// 🛒 PROCESS INCOMING ORDER
$table = $_POST['table_identifier'] ?? '';
$items = $_POST['items_json'] ?? '';
$total = $_POST['grand_total'] ?? 0;

if (!empty($table) && !empty($items)) {
    $stmt = $conn->prepare("INSERT INTO customer_orders (table_identifier, items_json, grand_total) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $table, $items, $total);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "SQL execution failed: " . $stmt->error]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["error" => "Missing required order data fields."]);
}

$conn->close();
?>
