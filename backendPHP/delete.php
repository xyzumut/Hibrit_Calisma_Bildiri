<?php
    require_once('db_connection.php');
    if(isset($_POST['op']) && $_POST['op']==='delete'){
        $sorgu1 = $db->prepare('DELETE FROM gunkontrol');
        $sorgu2 = $db->prepare('DELETE FROM gunler');
        $sorgu1->execute();
        $sorgu2->execute();
        if ($sorgu->rowCount()>0 && $sorgu->rowCount()>0) {
            echo json_encode('Silme İşlemi Başarılı');
        }
        else{
            echo json_encode('Silme İşlemi Başarısız');
        }
    }
?>