$( document ).ready(function() {
    home();
});

//Egitekoak orrialdea erakusteko
function login(){
	//Atzitu bi atalak
	var home = document.getElementById("home");
    var login = document.getElementById("login");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var akelarre = document.getElementById("akelarre");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");
	//Ezkutatu beste atala
	home.style.marginTop = "-5000px";
    gipuzkoa.style.marginTop = "-5000px";
	akelarre.style.marginTop = "-5000px";
	info.style.marginTop = "-5000px";
	maria.style.marginTop = "-5000px";
	//Estatistikak atala atzitu Ajax bidez
	$.ajax({
		method: 'POST',
		url: 'Login.php',
		data: "",
		cache : false,

	    success: function(mezua) {
	    	//Jasotako balioa txertatu atalean
	    	login.innerHTML = mezua;
	    	//Erakutsi atala
	    	login.style.marginTop = "30px";
	    	
	    },
	    error: function(){
			alert("Arazo bat egon da Ajax erantzunean");
		}
	});
}

//Gipuzkoa orrialdea erakusteko
function gipuzkoa(){
	//Atzitu bi atalak
	var home = document.getElementById("home");
    var login = document.getElementById("login");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var akelarre = document.getElementById("akelarre");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");
	//Ezkutatu beste atala
	home.style.marginTop = "-5000px";
    login.style.marginTop = "-5000px";
	akelarre.style.marginTop = "-5000px";
	info.style.marginTop = "-5000px";
	maria.style.marginTop = "-5000px";
	//Estatistikak atala atzitu Ajax bidez
	$.ajax({
		method: 'POST',
		url: '../html/GipuzkoaDeCine.html',
		data: "",
        dataType: "html",
		cache : false,

	    success: function(mezua) {
	    	//Jasotako balioa txertatu atalean
	    	gipuzkoa.innerHTML = mezua;
	    	//Erakutsi atala
	    	gipuzkoa.style.marginTop = "30px";
	    	
	    },
	    error: function(){
			alert("Arazo bat egon da Ajax erantzunean");
		}
	});
}

//Gipuzkoa orrialdea erakusteko
function akelarre(){
	//Atzitu bi atalak
	var home = document.getElementById("home");
    var akelarre = document.getElementById("akelarre");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var login = document.getElementById("login");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");

	//Ezkutatu beste atala
	home.style.marginTop = "-5000px";
    login.style.marginTop = "-5000px";
	gipuzkoa.style.marginTop = "-5000px";
	info.style.marginTop = "-5000px";
	maria.style.marginTop = "-5000px";
	//Estatistikak atala atzitu Ajax bidez
	$.ajax({
		method: 'POST',
		url: '../html/Akelarre.html',
		data: "",
        dataType: "html",
		cache : false,

	    success: function(mezua) {
	    	//Jasotako balioa txertatu atalean
	    	akelarre.innerHTML = mezua;
	    	//Erakutsi atala
	    	akelarre.style.marginTop = "30px";
	    	
	    },
	    error: function(){
			alert("Arazo bat egon da Ajax erantzunean");
		}
	});
}

function maria(){
	//Atzitu bi atalak
	var home = document.getElementById("home");
    var akelarre = document.getElementById("akelarre");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var login = document.getElementById("login");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");

	//Ezkutatu beste atala
	home.style.marginTop = "-5000px";
    login.style.marginTop = "-5000px";
	gipuzkoa.style.marginTop = "-5000px";
	info.style.marginTop = "-5000px";
	akelarre.style.marginTop = "-5000px";
	//Estatistikak atala atzitu Ajax bidez
	$.ajax({
		method: 'POST',
		url: '../php/Experience.php',
		data: "",
		dataType: "script",
		cache : false,

	    success: function(mezua) {
	    	//Jasotako balioa txertatu atalean
	    	//maria.innerHTML = mezua
	    	//Erakutsi atala
	    	maria.style.marginTop = "30px";
	    	
	    },
	    error: function(){
			alert("Arazo bat egon da Ajax erantzunean");
		}
	});
}

//Hasiera orrialdea erakusteko
function home(){
	//Atzitu bi atalak
	var home = document.getElementById("home");
    var login = document.getElementById("login");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var akelarre = document.getElementById("akelarre");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");
	//Ezkutatu beste atala
	gipuzkoa.style.marginTop = "-5000px";
    login.style.marginTop = "-5000px";
	akelarre.style.marginTop = "-5000px";
	info.style.marginTop = "-5000px";
	maria.style.marginTop = "-5000px";
	//Estatistikak atala atzitu Ajax bidez
	$.ajax({
		method: 'POST',
		url: '../html/Home.html',
        dataType: 'html',
		data: "",
		cache : false,

	    success: function(mezua) {
	    	//Jasotako balioa txertatu atalean
	    	home.innerHTML = mezua;
	    	//Erakutsi atala
	    	home.style.marginTop = "30px";
	    	
	    },
	    error: function(){
			alert("Arazo bat egon da Ajax erantzunean");
		}
	});
}

//Informazio orrialdea erakusteko
function info(){
	//Atzitu bi atalak
	var home = document.getElementById("home");
    var login = document.getElementById("login");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var akelarre = document.getElementById("akelarre");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");
	//Ezkutatu beste atala
	gipuzkoa.style.marginTop = "-5000px";
    login.style.marginTop = "-5000px";
	akelarre.style.marginTop = "-5000px";
	home.style.marginTop = "-5000px";
	info.style.marginTop = "-5000px";
	maria.style.marginTop = "-5000px";
	//Estatistikak atala atzitu Ajax bidez
	$.ajax({
		method: 'POST',
		url: '../php/Info.php',
		data: "",
		cache : false,

	    success: function(mezua) {
	    	//Jasotako balioa txertatu atalean
	    	info.innerHTML = mezua;
	    	//Erakutsi atala
	    	info.style.marginTop = "30px";
	    	
	    },
	    error: function(){
			alert("Arazo bat egon da Ajax erantzunean");
		}
	});
}