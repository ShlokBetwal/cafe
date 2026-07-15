<?php
// 📡 INTERNAL CLEVER CLOUD ENVIRONMENT VARIABLES
$servername = isset($_ENV["MYSQL_ADDON_HOST"]) ? $_ENV["MYSQL_ADDON_HOST"] : "bvhujbzywochddf20hir-mysql.services.clever-cloud.com";
$username   = isset($_ENV["MYSQL_ADDON_USER"]) ? $_ENV["MYSQL_ADDON_USER"] : "usbzg45wtej4xap";
$password   = isset($_ENV["MYSQL_ADDON_PASSWORD"]) ? $_ENV["MYSQL_ADDON_PASSWORD"] : "PASTE_YOUR_ACTUAL_PASSWORD_HERE"; 
$dbname     = isset($_ENV["MYSQL_ADDON_DB"]) ? $_ENV["MYSQL_ADDON_DB"] : "bvhujbzywochddf20hir";
$port       = isset($_ENV["MYSQL_ADDON_PORT"]) ? (int)$_ENV["MYSQL_ADDON_PORT"] : 3306;

// Connect to server
$conn = new mysqli($servername, $username, $password, $dbname, $port);<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 1. Establish connection details to your XAMPP MySQL Database
$servername = "bvhujbzywochddf20hir-mysql.services.clever-cloud.com";
$username = "usbzg45wtej4xap";
$password = "XfZ3BBYK48HJGHcqJITO"; 
$dbname = "bvhujbzywochddf20hir";
$port = 3306;

// Establishes connection using the cloud port layout
$conn = new mysqli($servername, $username, $password, $dbname, $port);

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
