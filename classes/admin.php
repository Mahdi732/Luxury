<?php
session_start();
require_once('../connection/connect.php');
class Admin {
    private $conn;
    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getCategories(){
        $sql = "SELECT category_id, name FROM `categories`";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getMark(){
        $sql = "SELECT Marque FROM `vehicles`";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Createorder($name, $img, $price, $desc, $ava, $cate, $mark){
        $sql = "INSERT INTO vehicles (category_id, model, price, description, availability, image_url, Marque) VALUES (:cate, :name, :price, :desc, :ava, :img, :mark)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':cate', $cate);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':desc', $desc);
        $stmt->bindParam(':ava', $ava);
        $stmt->bindParam(':img', $img);
        $stmt->bindParam(':mark', $mark);
        $stmt->execute();
        header("Location: ../pages/clientdashboard.php");
    }

    
}


if (isset($_POST['vehicles'])) {
    foreach ($_POST['vehicles'] as $vehicle) {
        $model = $vehicle['model'];
        $image = $vehicle['image'];
        $price = $vehicle['price'];
        $availability = $vehicle['availability'];
        $description = $vehicle['description'];
        $category = $vehicle['category'];
        $marque = $vehicle['marque'];
        $insert = new Admin();
        $insert->Createorder($model, $image, $price, $description, $availability, $category, $marque);
    }
}

?>