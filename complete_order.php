<?php
$conn = new mysqli("localhost", "root", "", "cafe_db");
if (!empty($_POST['id'])) {
    $id = (int) $_POST['id'];
    $conn->query("UPDATE customer_orders SET order_status = 'Completed' WHERE id = $id");
}
$conn->close();
?>