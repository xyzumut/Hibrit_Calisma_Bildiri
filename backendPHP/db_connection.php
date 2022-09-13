<?php
    header("Access-Control-Allow-Origin: *");
    try {
        $db = new PDO('mysql:host=localhost;dbname=hybrid_db','root','');
    } catch (\Throwable $th) {
        echo json_encode('Veritabanına Bağlanamadı') ;
    }
?>
