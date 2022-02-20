<h3 mb-2>AKELARRE GASTRONÓMICO</h3>
<div class="row align-items-center w-100" style="height:400px">
    <div class="col">
        <div id="map" style="width: 40vw; height:400px" ></div>
    </div>
    <div class="col">
      <div style="width: 100%; height: 400px;">
      <h4>Hola, Iñaki</h4>
      <h5>Ven a recorrer Gipuzkoa conmigo.</h5> 
    <p>Empezaremos por visitar Deba, en la costa guipuzcoana. 
    En la oficina de turismo podrás leer un QR que te ayudará a llegar al lugar secreto donde se rodó la película
    <p>Continuaremos hacia Getaria y en la oficina de turismo encontrarás el QR que te llevará a una degustación de Txakoli, antes de ir a comer por la zona.</p>
   <p> A la tarde podrás visitar el Museo de la sidra en Astigarraga y disfrutar de una cena en alguno de las sidrerías de la zona</p>
   <p> Y, recuerda que si realizas todo el circuito participaras en un sorteo en el restaurante Akelarre de san Sebastián, para la siguiente visita.</p> 
</div>
  </div>

  <script type="text/javascript" src="https://www.geo.euskadi.eus/bisorea/v4/API/ApiGeoEuskadi.js" id="script1"></script>
    <script type="text/javascript" id="script2">
        
        // Funcion de arranque de la aplicacion
        function loadApp(markers,doneactivities) {
            loadAPIGeoEuskadi(
            {
              divMapa: 'map', 
              showwidgets: false, 
              capaBase: 'MapaGris', 
              extensionInicial: 
              { 
                "xmin": 470491.9115040103, 
                "ymin": 4726457.403240426, 
                "xmax": 613002.3933885915, 
                "ymax": 4816436.186627009, 
                "wkid": 25830
              }
            }).then(function(geoEuskadiAPI)
            {
                var activities=["1","2","3","4","5"]
                var b=doneactivities
                var leftactivities = activities.filter(e=>!b.includes(e))
                
                //Respuesta de la promesa
                //Hacer uso de los métodos de la API a través del objeto 'geoEuskadiAPI'

                // MAPAGRIS, ORTOFOTO_CARTOGRAFIA, ORTOFOTO_HIBRIDO,ORTOFOTO_ORTO, TOPOGRAFICO
                geoEuskadiAPI.api.layers.setBaseLayer(geoEuskadiAPI.api.baseLayers.ORTOFOTO_CARTOGRAFIA);

                //Add a marker
                //geoEuskadiAPI.api.interactions.addMarker(['563602.501','4793883.713'], {});
                for(var i=0;i<leftactivities.length;i++){

                    geoEuskadiAPI.api.interactions.addMarker([markers[leftactivities[i]][0],markers[leftactivities[i]][1]], {})
                }
            })
        }
    </script>


<?php
//['563602.501','4793883.713']
    $markers = array("1"=>['564594.813','4794788.074'], "2"=>['552432.035','4793701.359'], "3"=>['564594.813','4794788.074'], "4"=>['585330.088', '4792626.998'], "5"=>['585330.088', '4792626.998']);
    if(!isset($_SESSION)){
        session_start();
    }
    if(isset($_SESSION['email'])){
        $email = $_SESSION['email'];
    }
    //if($_SESSION['email']!=""){}
        include "DbConfig.php";
    try{
        $dsn = "mysql:host=$server;dbname=$db";
        $dbh = new PDO($dsn, $username, $password);
    } catch(PDOException $e){
        echo $e->getMessage();
    }


    //$email = "morenoartabe@gmail.com";

    if(isset($email)){
    $stmt = $dbh->prepare("SELECT ID FROM users WHERE users.email = ?");
    $stmt->bindParam(1,$email);
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $stmt->execute();

    $userid = $stmt->fetch()["ID"];

    $stmt = $dbh->prepare("SELECT activityID FROM user_activity WHERE userID = ?");
    $stmt->bindParam(1,$userid);
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $stmt->execute();

    $doneActivities = array();

    for($i = 0;$i<5;$i++){
        array_push($doneActivities,$stmt->fetch()["activityID"]);
        array_push($doneActivities,$stmt->fetch()["activityID"]);
        array_push($doneActivities,$stmt->fetch()["activityID"]);
        array_push($doneActivities,$stmt->fetch()["activityID"]);
        array_push($doneActivities,$stmt->fetch()["activityID"]);
    }
    
 

    echo "<script id='script3'>loadApp(".json_encode($markers).",".json_encode($doneActivities).")</script>";
    }else{
        $doneActivities = array();
        echo "<script id='script3'>loadApp(".json_encode($markers).",".json_encode($doneActivities).")</script>";
    }
?>