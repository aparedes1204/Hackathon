// APPLICAITON CREATE MAPS VARIABLES
var _options = [];
var _maps = [];
var _mapExtentChangeEvent;
var userConfig = {};

//definición variables
var mapDiv = null;
var defaultBaseLayer = null;
var defaultExtensionInicial=null;
var showwidgets = null;
function getURLEntorno()
{
    var scripts = document.getElementsByTagName("script");
    var regex = /API\/+ApiGeoEuskadi.js.*/;
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i] && scripts[i].src && scripts[i].src.match && scripts[i].src.match(regex)) {
            return scripts[i].src.replace(regex, "");
        }
    }
    return "https://www.geo.euskadi.eus/bisorea/";
}
var urlEntorno = getURLEntorno();
var COREProxy = {
    config: [],
    listeners: [],
    register: function (addFunctions) {
        COREProxy.listeners.push(addFunctions)
    },
    api: {}
};
COREProxy.api = new Object();
COREProxy.api.baseLayers = new Object();
COREProxy.api.baseLayers.MAPAGRIS = "MapaGris";
COREProxy.api.baseLayers.ORTOFOTO_CARTOGRAFIA = "Ortofoto-cartografia";
COREProxy.api.baseLayers.ORTOFOTO_HIBRIDO = "Ortofoto-hibrido";
COREProxy.api.baseLayers.ORTOFOTO_ORTO = "Ortofoto-orto";
COREProxy.api.baseLayers.TOPOGRAFICO = "Topografico";

class Parser_c {
    constructor(attrConfig) {
        this.attrConfig = typeof attrConfig != "undefined" ? attrConfig : new Object();
        this.useLoadingSplash = typeof this.attrConfig.useLoadingSplash != "undefined" ? this.attrConfig.useLoadingSplash : false;
        COREProxy.config.showwidgets = typeof this.attrConfig.showwidgets != "undefined" ? this.attrConfig.showwidgets : false;
        if(typeof this.attrConfig.capaBase != 'undefined') defaultBaseLayer = this.attrConfig.capaBase;
        defaultExtensionInicial=typeof this.attrConfig.extensionInicial != "undefined" ? this.attrConfig.extensionInicial : null;
        COREProxy.config.extensionInicial=defaultExtensionInicial;
        showwidgets = COREProxy.config.showwidgets;
        COREProxy.config.typeLoad = "Legacy";
        COREProxy.appConfigs={};
        COREProxy.config.multimap=typeof this.attrConfig.multimap!= "undefined" ? this.attrConfig.multimap : false;
        COREProxy.config.capasvisor=typeof this.attrConfig.capasvisor!= "undefined" ? this.attrConfig.capasvisor : false;

        if(typeof attrConfig == 'undefined')
        {
            this.container = null;
        }
        else
        {
            this.container = typeof attrConfig.divMapa != 'undefined' ? document.getElementById(attrConfig.divMapa) : null;
        }
        
        if(this.container == null)
        {
            this.container = mapDiv != null ? document.getElementById(mapDiv) : null;
        }
        COREProxy.config.mapDiv= attrConfig.divMapa;
        //if(document.body != null) document.body.className = "claro jimu-main-font";

        var containerDiv = document.getElementById("container-div");
        if(containerDiv == null)
        {
            var containerDiv = document.createElement("div");
            containerDiv.setAttribute('id', 'container-div');
            containerDiv.className = 'claro jimu-main-font geoeuskadi-container';
            //containerDiv.classList.add(['claro', 'jimu-main-font', 'geoeuskadi-container']);
        }
        /** INICIO LOADING ELEMENT */
        //Element padre
        var mainElement = document.getElementById("main-loading");
        if(mainElement == null)
        {
            var mainElement = document.createElement("div");
            mainElement.setAttribute('id', 'main-loading');
            // Child
            var appElement = document.createElement("div");
            appElement.setAttribute('id', 'app-loading');

            if (this.useLoadingSplash) {

                // child 2
                var loadingGifElement = document.createElement("div");
                loadingGifElement.setAttribute('id', 'loading-gif');

                // Add elements
                mainElement.appendChild(appElement);
                mainElement.appendChild(loadingGifElement);
            }

        }


        // Insert 
        if(document.body != null)
        {
             document.body.insertAdjacentElement('afterbegin', containerDiv);
             containerDiv.appendChild(mainElement);
        }
        /** FIN LOADING ELEMENT */

        /**
        * Crear MainPage donde estara el mapa de geoeuskadi
        */
        var mainPage = document.getElementById("main-page");
        if(mainPage == null)
        {
            mainPage = document.createElement("div");
            mainPage.setAttribute('id', 'main-page');
            if(this.container != null)
            {
                mainPage.style.width = this.container.style.width;
                mainPage.style.height = this.container.style.height;
                mainPage.className = this.container.className;
            }  
        }

        // Child


        // Child change map 2d_3d
        var fakeMap = document.getElementById("fakeMap");
        if(fakeMap == null)
        {
            fakeMap = document.createElement("div");
            fakeMap.setAttribute('id', 'fakeMap');
            fakeMap.setAttribute("style", "position: absolute; top: 0; left: 0; overflow: hidden; z-index: 99;");
            fakeMap.className="hidden";
        }

        var testFrame = document.getElementById("testFrame");
        if(testFrame == null)
        {
            testFrame = document.createElement("iframe");
            testFrame.setAttribute('id', 'testFrame');
            var url_string = (window.location.href).toLowerCase();
            var url = new URL(url_string);
            var lang = url.searchParams.get("lang");
            var title = 'Visor de GeoEuskadi en su version en 3D activable a traves del boton \"3D\"';
            if(lang == 'eu')
            {
            title = 'GeoEuskadi bisorearen 3D bertsioa. Bertsioa ikusteko erabili 3D botoia.'
            }
            testFrame.setAttribute('title', title);
            testFrame.setAttribute("style", "width: 100%; height: 100%; border: 0px;");
            fakeMap.appendChild(testFrame);
        }
        var jimuLayoutManager  = document.getElementById("jimu-layout-manager");
        if(jimuLayoutManager == null)
        {
            jimuLayoutManager = document.createElement("div");
            jimuLayoutManager.setAttribute('id', 'jimu-layout-manager');
            if (this.container != null && this.container != "") {
                mainPage.appendChild(jimuLayoutManager);
            } else if (this.container == null) {
                mainPage.appendChild(jimuLayoutManager);
            }

            mainPage.appendChild(fakeMap);
        }



        if (this.container != null) {
            
            this.container.insertAdjacentElement('beforebegin', containerDiv);
            containerDiv.appendChild(mainPage);
            if (this.container != null && this.container != "") {
                this.container.appendChild(jimuLayoutManager);
            }
            mainPage.appendChild(this.container);
        } else {
            mainElement.insertAdjacentElement('afterend', mainPage);
        }


        // Terraformer reference
        var terraformer = document.getElementById("terraformerscript");
        if(terraformer == null)
        {
            terraformer = document.createElement("script");
            terraformer.setAttribute('id', 'terraformerscript');
            terraformer.src = urlEntorno + "/web-component/" + "/libs/terraformer/terraformer.js";
            terraformer.async = false;
            if(document.body != null) document.body.appendChild(terraformer);
        }

        var terraformer_arcgis_parser = document.getElementById("terraformerarcgisparserscript");
        if(terraformer_arcgis_parser == null)
        {
            terraformer_arcgis_parser = document.createElement("script");
            terraformer_arcgis_parser.setAttribute('id', 'terraformerarcgisparserscript');
            terraformer_arcgis_parser.src = urlEntorno + "/web-component/" + "/libs/terraformer/terraformer-arcgis-parser.js";
            terraformer_arcgis_parser.async = false;
            if(document.body != null) document.body.appendChild(terraformer_arcgis_parser);
        }

        //OpenLayer reference style 
        var openlayer = document.getElementById("openlayerscript");
        if(openlayer == null){
            openlayer = document.createElement("script");
            openlayer.setAttribute('id', 'openlayerscript');
            openlayer.src = "https://openlayers.org/en/v4.6.5/build/ol.js";
            openlayer.async = false;
            if(document.body != null) document.body.appendChild(openlayer);
        }


        // Css
        if (this.useLoadingSplash) {
            var loading = document.createElement("link");
            loading.type = "text/css";
            loading.rel = "stylesheet";
            loading.href = urlEntorno + "/configs/loading/loading.css?v=1.0";
            if(document.body != null) document.body.appendChild(loading);
        }

        var styleCustom = document.getElementById("stylecustom");
        if(styleCustom == null)
        {
            styleCustom = document.createElement("link");
            styleCustom.setAttribute('id', 'stylecustom');
            styleCustom.type = "text/css";
            styleCustom.rel = "stylesheet";
            styleCustom.href = urlEntorno + "/web-component/config/styleCustom.css";
            if(document.body != null) document.body.appendChild(styleCustom);
        }

        var env = document.getElementById("envscript");
        if(env == null)
        {
            env = document.createElement("script");
            env.setAttribute('id', 'envscript');
            env.src = urlEntorno + "/env.js?" + (new Date().getTime());
            env.async = false;
            if(document.body != null) document.body.appendChild(env);
        }
        var simpleLoader = document.getElementById("simpleloaderscript");
        if(simpleLoader == null)
        {
            simpleLoader = document.createElement("script");
            simpleLoader.setAttribute('id', 'simpleloaderscript');
            simpleLoader.src = urlEntorno + "/simpleLoader.js?" + (new Date().getTime());
            simpleLoader.async = false;
            if(document.body != null) document.body.appendChild(simpleLoader);
        }

        var init = document.getElementById("initscript");
        if(init == null)
        {
            init = document.createElement("script");
            init.setAttribute('id', 'initscript');
            init.src = urlEntorno + "/init.js?" + (new Date().getTime());
            init.async = false;
            if(document.body != null) document.body.appendChild(init);
        }
    }
}

function loadAPIGeoEuskadi(configuracion)
{
    return new Promise((resolve, reject) => {
        loadAPIMap(configuracion).then(function(res)
        {
            try
            {
                require(["geoEuskadiAPI"], function (geoEuskadiAPI) {
                    geoEuskadiAPI.InitAPI().then(function (geoEuskadiAPI) {
                        resolve(geoEuskadiAPI); 
                    }).catch(function (err) { reject(err);});
                });
            }
            catch (e){reject(e);}
            
        })
        .catch(function (err) { reject(err); });
    });
}

function loadAPIMap(configuracion)
{
    return new Promise((resolve, reject) => {
        COREProxy.config.typeLoad = "AMD";
        COREProxy.appConfigs={};
        if(typeof configuracion.divMapa != 'undefined') mapDiv = configuracion.divMapa;
        if(typeof configuracion.capaBase != 'undefined') defaultBaseLayer = configuracion.capaBase;
        if(typeof configuracion.portalURL != 'undefined') COREProxy.config.portalURL = configuracion.portalURL;
        if(typeof configuracion.portalItem != 'undefined') COREProxy.config.portalItem = configuracion.portalItem;

        if(typeof configuracion.showwidgets != 'undefined') COREProxy.config.showwidgets = configuracion.showwidgets;
        else COREProxy.config.showwidgets = false;

        defaultExtensionInicial=typeof configuracion.extensionInicial != "undefined" ? configuracion.extensionInicial : null;
        COREProxy.config.extensionInicial=defaultExtensionInicial;
        COREProxy.config.multimap=typeof configuracion.multimap!= "undefined" ? configuracion.multimap : false;
        COREProxy.config.capasvisor=typeof configuracion.capasvisor!= "undefined" ? configuracion.capasvisor : false;
        //carga de elementos y scripts 
        this.container = mapDiv != null ? document.getElementById(mapDiv) : null;
        this.container.display = 'none';
        this.useLoadingSplash = typeof configuracion.useLoadingSplash != "undefined" ? configuracion.useLoadingSplash : true;
        COREProxy.config.mapDiv= mapDiv;
        //if(document.body != null) document.body.className = "claro jimu-main-font";
        /** INICIO LOADING ELEMENT */
        //capa contenedora
        var containerDiv = document.getElementById("container-div");
        if(containerDiv == null)
        {
            var containerDiv = document.createElement("div");
            containerDiv.setAttribute('id', 'container-div');
            containerDiv.className = 'claro jimu-main-font geoeuskadi-container';
            //containerDiv.classList.add(['claro', 'jimu-main-font', 'geoeuskadi-container']);
        }
        var styleCustom = document.getElementById("stylecustom");
        if(styleCustom == null)
        {
            styleCustom = document.createElement("link");
            styleCustom.setAttribute('id', 'stylecustom');
            styleCustom.type = "text/css";
            styleCustom.rel = "stylesheet";
            styleCustom.href = urlEntorno + "API/css/styleCustom.css";
            if(document.body != null) document.body.appendChild(styleCustom);
        }
        //Element padre
        var mainElement = document.getElementById("main-loading");
        if(mainElement == null)
        {
            var mainElement = document.createElement("div");
            mainElement.setAttribute('id', 'main-loading');
            // Child
            if(document.getElementById("app-loading") == null)
            {
                var appElement = document.createElement("div");
                appElement.setAttribute('id', 'app-loading');
                mainElement.appendChild(appElement); 
            }
        
            // child 2
            if(document.getElementById("loading-gif") == null)
            {
                var loadingGifElement =  document.createElement("div");
                loadingGifElement.setAttribute('id', 'loading-gif');
                mainElement.appendChild(loadingGifElement);
            }
        }


        // Insert 
        if(document.body != null)
        {
            
             document.body.insertAdjacentElement('afterbegin', containerDiv);
             containerDiv.appendChild(mainElement);
        }
        /** FIN LOADING ELEMENT */

        /**
        * Crear MainPage donde estara el mapa de geoeuskadi
        */
        var mainPage = document.getElementById("main-page");
        if(mainPage == null)
        {
            mainPage = document.createElement("div");
            mainPage.setAttribute('id', 'main-page');
        }

        // Child


        // Child change map 2d_3d
        var fakeMap = document.getElementById("fakeMap");
        if(fakeMap == null)
        {
            fakeMap = document.createElement("div");
            fakeMap.setAttribute('id', 'fakeMap');
            fakeMap.setAttribute("style", "position: absolute; top: 0; left: 0; overflow: hidden; z-index: 99;");
            fakeMap.className="hidden";
        }

        var testFrame = document.getElementById("testFrame");
        if(testFrame == null)
        {
            testFrame = document.createElement("iframe");
            testFrame.setAttribute('id', 'testFrame');
            testFrame.setAttribute("style", "width: 100%; height: 100%; border: 0px;");
            fakeMap.appendChild(testFrame);
        }
        var jimuLayoutManager  = document.getElementById("jimu-layout-manager");
        if(jimuLayoutManager == null)
        {
            jimuLayoutManager = document.createElement("div");
            jimuLayoutManager.setAttribute('id', 'jimu-layout-manager');
            if (this.container != null && this.container != "") {
                mainPage.appendChild(jimuLayoutManager);
            } else if (this.container == null) {
                mainPage.appendChild(jimuLayoutManager);
            }

            mainPage.appendChild(fakeMap);
        }
        if (this.container != null) {
            
            this.container.insertAdjacentElement('beforebegin', containerDiv);
            containerDiv.appendChild(mainPage);
            if (this.container != null && this.container != "") {
                this.container.appendChild(jimuLayoutManager);
            }
            mainPage.appendChild(this.container);
        } else {
            mainElement.insertAdjacentElement('afterend', mainPage);
        }

        // Terraformer reference
        var terraformer = document.getElementById("terraformerscript");
        if(terraformer == null)
        {
            terraformer = document.createElement("script");
            terraformer.setAttribute('id', 'terraformerscript');
            terraformer.src = urlEntorno + "libs/jsgeoEuskadi/" + "/terraformer/terraformer.js";
            terraformer.async = false;
            if(document.body != null) document.body.appendChild(terraformer);
        }

        var terraformer_arcgis_parser = document.getElementById("terraformerarcgisparserscript");
        if(terraformer_arcgis_parser == null)
        {
            terraformer_arcgis_parser = document.createElement("script");
            terraformer_arcgis_parser.setAttribute('id', 'terraformerarcgisparserscript');
            terraformer_arcgis_parser.src = urlEntorno + "libs/jsgeoEuskadi/" + "/terraformer/terraformer-arcgis-parser.js";
            terraformer_arcgis_parser.async = false;
            if(document.body != null) document.body.appendChild(terraformer_arcgis_parser);
        }
        //OpenLayer reference style 
        var openlayer = document.getElementById("openlayerscript");
        if(openlayer == null){
            openlayer = document.createElement("script");
            openlayer.setAttribute('id', 'openlayerscript');
            openlayer.src = "https://openlayers.org/en/v4.6.5/build/ol.js";
            openlayer.async = false;
            if(document.body != null) document.body.appendChild(openlayer);
        }
        // Css
        if (this.useLoadingSplash) {
            var loading = document.createElement("link");
            loading.type = "text/css";
            loading.rel = "stylesheet";
            loading.href = urlEntorno + "/configs/loading/loading.css?v=1.0";
            if(document.body != null) document.body.appendChild(loading);
        }

        
        var env = document.getElementById("envscript");
        if(env == null)
        {
            env = document.createElement("script");
            env.setAttribute('id', 'envscript');
            env.src = urlEntorno + "/env.js?" + (new Date().getTime());
            env.async = false;
            if(document.body != null) document.body.appendChild(env);
        }
        var simpleLoader = document.getElementById("simpleloaderscript");
        if(simpleLoader == null)
        {
            simpleLoader = document.createElement("script");
            simpleLoader.setAttribute('id', 'simpleloaderscript');
            simpleLoader.src = urlEntorno + "/simpleLoader.js?" + (new Date().getTime());
            simpleLoader.async = false;
            if(document.body != null) document.body.appendChild(simpleLoader);
        }

        var init = document.getElementById("initscript");
        if(init == null)
        {
            init = document.createElement("script");
            init.setAttribute('id', 'initscript');
            init.src = urlEntorno + "/init.js?" + (new Date().getTime());
            init.async = false;
            if(document.body != null) document.body.appendChild(init);
        }
        var bod = document.getElementsByTagName("body")[0];
        bod.addEventListener("load", function(event) {
            if (event.target.nodeName === "SCRIPT")
            {
                //console.log("Script loaded: " + event.target.getAttribute("src"));
                if(event.target.getAttribute("src").includes('API/config/API.js') )
                //if(event.target.getAttribute("src").includes('API/config/API.js') )
                {
                    resolve(true);
                }    
            }
        }, true);
        
    });
    
}