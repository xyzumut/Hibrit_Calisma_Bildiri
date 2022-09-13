<?php
    require_once('db_connection.php');
    if (($_SERVER['REQUEST_METHOD']==='GET') && isset($_GET['username'])) {
        $sorgu = $db->prepare("SELECT * FROM users WHERE username = ?");
        $sorgu->execute([$_GET['username']]);
        $veriler = $sorgu->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($veriler);
        echo $json;
    }
?>
