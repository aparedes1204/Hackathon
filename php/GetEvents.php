<?php 

$datetime = new DateTime('tomorrow');
$datetime->format('Y-m-d');

$year = $datetime->format('Y');
$month = $datetime->format('m');
$day = $datetime->format('d');


$link = "https://api.euskadi.eus/culture/events/v1.0/events/byDate/" . $year . "/" . $month . "/" . $day . "/byMunicipality/20/" . $_POST["id"] . "?_elements=3&_page=1";

//Rest bezeroa
 $ch = curl_init($link); 
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
 $erantzuna = curl_exec($ch); 
 curl_close($ch); 
          
 $datuak = json_decode($erantzuna, true); 
          
 if(!empty($datuak)){ 

     $items = $datuak['items']; 
     if (empty($items)) {
         echo '<p></p><h5>No hay eventos programados para mañana en el municipio seleccionado.</h5>';
     } else{
     foreach ($items as $i) {
            echo "<div class='card bg-transparent'>
                    <div class='row no-gutters'>";
                    if (isset($i["images"][0])){
                        echo "<div class='col-auto'>
                            <img class='card-img' id='image' src='".$i["images"][0]["imageUrl"]."' alt='Suresh Dasari Card' style='object-fit: cover; height: 200px'>
                        </div>";
                    } else {
                        echo "<div class='col-auto'>
                            <img class='card-img' id='image' src='../img/Evento.jpg' alt='Suresh Dasari Card' style='object-fit: cover; height: 200px; width: 300px'>
                        </div>";
                    }
                    echo"
                            <div class='col align-self-center'>
                                <div class='card-body align-self-center'>";
                    if (isset($i["sourceUrlEs"])){

                        echo "<h4 class='align-self-center'><a href='".$i["sourceUrlEs"]."'>" .$i["nameEs"]."</a></h4>";
                    } else {
                        echo "<h4 class='align-self-center'>".$i["nameEs"]."</h4>";
                    }
                        echo "
                                </div>
                            </div>     
                    </div>
                   </div>";
                //echo '<img src="' . $i["images"][0]["imageUrl"] . '" style>';
         //echo "<h4><a href='".$i["sourceUrlEs"]."'>" .$i["nameEs"]."</a></h4>";
     }
    }
 }else{ 
     echo 'IP data is not found!'; 
 } 

?>
