<?php
    require_once('db_connection.php');

    if (isset($_GET['op']) && $_GET['op']==='getDashboard') {
        $sorgu = $db->prepare('SELECT users.username, gunler.pazartesi, gunler.sali, gunler.carsamba, gunler.persembe, gunler.cuma, gunkontrol.kontrol FROM users,gunler,gunkontrol WHERE users.id=gunkontrol.userid and users.id = gunler.userid');
        $sorgu->execute();
        $veriler = $sorgu->FetchAll(PDO::FETCH_ASSOC);
        if ($sorgu->rowCount()>0) {
            echo json_encode($veriler);
        }
        else{
            echo json_encode('Veri Yok');
        }
    }



?>