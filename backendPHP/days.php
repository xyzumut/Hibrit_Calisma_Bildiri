<?php
    require_once('db_connection.php');

    if ($_POST && isset($_POST['op']) && $_POST['op']==='add_day') {
        $pazartesi = $_POST['Pazartesi'] == 'true' ? 1 : 0;
        $sali = $_POST['Salı'] == 'true' ? 1 : 0;
        $carsamba = $_POST['Çarsamba'] == 'true' ? 1 : 0;
        $persembe = $_POST['Perşembe'] == 'true' ? 1 : 0;
        $cuma = $_POST['Cuma'] == 'true' ? 1 : 0;
        $username = $_POST['username'];
        $sorgu = $db->prepare('SELECT id from users  where username = ?');
        $sorgu->execute(array($username));
        $userid = $sorgu->fetch(PDO::FETCH_ASSOC);
        $userid = $userid['id'];
        $sorgu2 = $db->prepare('INSERT INTO gunler SET pazartesi= ? , sali= ? , carsamba= ? , persembe= ? , cuma= ? , userid = ?');
        $sorgu2->execute(array($pazartesi,$sali,$carsamba,$persembe,$cuma,$userid));
        if ($sorgu2->rowCount() > 0) {
            $sorgu3 = $db->prepare('INSERT INTO gunkontrol SET userid = ? , kontrol = ? ');
            $sorgu3->execute(array($userid,1));
            if ($sorgu3->rowCount() > 0) {
                echo json_encode('İşlem Başarılı');
            }
            else{
                echo json_encode('İşlem Başarısız');
            } 
        }
        else{
            echo json_encode('İşlem Başarısız');
        }         
    }
    elseif ($_GET && isset($_GET['op']) && $_GET['op']==='getcontrol') {
        $sorgu = $db->prepare('SELECT gunler.userid , gunler.pazartesi,gunler.sali,gunler.carsamba,gunler.persembe,gunler.cuma,gunkontrol.kontrol FROM gunler,gunkontrol WHERE gunler.userid = gunkontrol.userid AND gunkontrol.userid = (SELECT id from users WHERE username= ?)');
        $sorgu->execute(array($_GET['username']));
        $cevap = $sorgu->fetch(PDO::FETCH_ASSOC);
        echo json_encode($cevap);
    }


?>

