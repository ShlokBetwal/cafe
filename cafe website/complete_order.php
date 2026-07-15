<?php
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
