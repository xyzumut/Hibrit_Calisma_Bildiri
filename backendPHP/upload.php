<?php
    require_once('db_connection.php');
    error_reporting(E_ERROR | E_PARSE);
    if ($_FILES['profile']['error']===0 && isset($_POST['username'])) {
        if (is_uploaded_file($_FILES['profile']['tmp_name'])) {
            try {
                $sorgu = $db->prepare("SELECT profile_path FROM users WHERE username = ?");
                $sorgu->execute([$_POST['username']]);
                $eskiResim = $sorgu->fetch(PDO::FETCH_ASSOC);
                unlink($_SERVER['DOCUMENT_ROOT'].'/hybrid/src/uploads/'.$eskiResim['profile_path']);
            } catch (\Throwable $th) {}
            $extention = explode('.',$_FILES['profile']['full_path'])[count(explode('.',$_FILES['profile']['full_path']))-1];
            //extention dosya uzantısıdır
            $dosyayolu = $_SERVER['DOCUMENT_ROOT'].'/hybrid/src/uploads/'.$_POST['username'].'.'.$extention;
            $upload = move_uploaded_file($_FILES['profile']['tmp_name'],$dosyayolu);
            if ($upload) {
                $sorgu = $db->prepare("UPDATE users SET profile_path = ? WHERE username = ?");
                try {
                    $resimAdi = $_POST['username'].'.'.$extention;
                    $sorgu->execute(array($resimAdi,$_POST['username']));
                    echo json_encode($resimAdi);
                } catch (\Throwable $th) {
                    echo json_encode('false');
                }
            }
            else{
                echo json_encode('Dosya Yüklenemedi');
            }
        }
    }
?>
