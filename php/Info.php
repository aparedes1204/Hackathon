<?php 

echo '<div class="row align-items-center">
    <div class="col">
    <h2>Eventos de mañana:</h2>
    </div>
    <div class="col">';
    

//Dropdown
echo '<select class="form-select" aria-label="Default select example" onchange="getEvents(this)">
        <option selected>Seleccione el municipio</option>';

//Rest bezeroa
 $ch = curl_init("https://api.euskadi.eus/culture/events/v1.0/municipalities/byProvince/{provinceId}?_elements=100&_page=1&provinceId=20"); 
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
 $erantzuna = curl_exec($ch); 
 curl_close($ch); 
          
 $datuak = json_decode($erantzuna, true); 
          
 if(!empty($datuak)){ 

    $items = $datuak['items']; 
    
    foreach ($items as $i) {
        echo '<option value="' . $i["municipalityId"] . '">' . $i["nameEs"] . '</option>';
    }
 }else{ 
     echo 'Error in event API!'; 
 } 

 echo '</select>
        </div>
        </div>';
 echo '<div id="events"></div>'

?>
