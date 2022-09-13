<?php
    require_once('db_connection.php');
    if (isset($_POST['op']) && $_POST['op'] = 'adduser') {
        $sorgu = $db->prepare('INSERT INTO users SET username = ? , password = ? , userType = ?');
        $sorgu->execute(array($_POST['username'],$_POST['password'],$_POST['usertype']));
        if ($sorgu->rowCount()>0) {
            echo json_encode('İşlem Başarılı');
        }
        else{
            echo json_encode('İşlem Başarısız');
        }
    }
?>