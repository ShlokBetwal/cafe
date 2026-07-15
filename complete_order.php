<?php
// 📡 INTERNAL CLEVER CLOUD ENVIRONMENT VARIABLES
$servername = isset($_ENV["MYSQL_ADDON_HOST"]) ? $_ENV["MYSQL_ADDON_HOST"] : "bvhujbzywochddf20hir-mysql.services.clever-cloud.com";
$username   = isset($_ENV["MYSQL_ADDON_USER"]) ? $_ENV["MYSQL_ADDON_USER"] : "usbzg45wtej4xap";
$password   = isset($_ENV["MYSQL_ADDON_PASSWORD"]) ? $_ENV["MYSQL_ADDON_PASSWORD"] : "PASTE_YOUR_ACTUAL_PASSWORD_HERE"; 
$dbname     = isset($_ENV["MYSQL_ADDON_DB"]) ? $_ENV["MYSQL_ADDON_DB"] : "bvhujbzywochddf20hir";
$port       = isset($_ENV["MYSQL_ADDON_PORT"]) ? (int)$_ENV["MYSQL_ADDON_PORT"] : 3306;

// Connect to server
$conn = new mysqli($servername, $username, $password, $dbname, $port);
$servername = "bvhujbzywochddf20hir-mysql.services.clever-cloud.com";
$username = "usbzg45wtej4xap";
$password = "XfZ3BBYK48HJGHcqJITO"; 
$dbname = "bvhujbzywochddf20hir";
$port = 3306;

// Establishes connection using the cloud port layout
$conn = new mysqli($servername, $username, $password, $dbname, $port);
$conn = new mysqli("localhost", "root", "", "cafe_db");
if (!empty($_POST['id'])) {
    $id = (int) $_POST['id'];
    $conn->query("UPDATE customer_orders SET order_status = 'Completed' WHERE id = $id");
}
$conn->close();
?>
