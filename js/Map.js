import "https://www.geo.euskadi.eus/bisorea/v4/API/ApiGeoEuskadi.js"
function loadApp() {
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
        //Respuesta de la promesa
        //Hacer uso de los métodos de la API a través del objeto 'geoEuskadiAPI'

        // MAPAGRIS, ORTOFOTO_CARTOGRAFIA, ORTOFOTO_HIBRIDO,ORTOFOTO_ORTO, TOPOGRAFICO
        geoEuskadiAPI.api.layers.setBaseLayer(geoEuskadiAPI.api.baseLayers.ORTOFOTO_CARTOGRAFIA);

        //Add a marker
        geoEuskadiAPI.api.interactions.addMarker(['505289.712263335', '4789467.47941155'], {});
    })
}