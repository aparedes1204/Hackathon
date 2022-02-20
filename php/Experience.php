<div id="map" style="width: 640px;height:400px" ></div>
  
  <script type="text/javascript" src="https://www.geo.euskadi.eus/bisorea/v4/API/ApiGeoEuskadi.js"></script>
    <script type="text/javascript" id="script">

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
    //if($_SESSION['email']!=""){
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

    array_push($doneActivities,$stmt->fetch()["activityID"]);
    array_push($doneActivities,$stmt->fetch()["activityID"]);
    array_push($doneActivities,$stmt->fetch()["activityID"]);
    array_push($doneActivities,$stmt->fetch()["activityID"]);
    array_push($doneActivities,$stmt->fetch()["activityID"]);
    
 

    echo "<script>loadApp(".json_encode($markers).",".json_encode($doneActivities).")</script>";
    }else{
        $doneActivities = array();
        echo "<script>loadApp(".json_encode($markers).",".json_encode($doneActivities).")</script>";
    }
?>