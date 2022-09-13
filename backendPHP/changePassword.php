<?php
    require_once('db_connection.php');
    if (($_SERVER['REQUEST_METHOD']==='POST') && isset($_POST['operation']) && $_POST['operation']==='passwordUpdate') {
        $yeniSifre = $_POST['newPassword'];
        $username = $_POST['username'];
        $sorgu = $db->prepare("UPDATE users SET password=? WHERE username=?");
        $sorgu->execute(array($yeniSifre,$username));
        if($sorgu->rowCount() > 0){
            echo json_encode('Şifre Güncellendi');
        }
        else{
            echo json_encode('Şifre Güncellenemedi!');
        }
    }
?>