$( document ).ready(function() {
    home();
});

//Egitekoak orrialdea erakusteko
function whatToDo(){
	//Atzitu bi atalak
	var home = document.getElementById("home");
    var what = document.getElementById("what");
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
		url: 'WhatToDo.php',
		data: "",
		cache : false,

	    success: function(mezua) {
	    	//Jasotako balioa txertatu atalean
	    	what.innerHTML = mezua;
	    	//Erakutsi atala
	    	what.style.marginTop = "30px";
	    	
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
    var what = document.getElementById("what");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var akelarre = document.getElementById("akelarre");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");
	//Ezkutatu beste atala
	home.style.marginTop = "-5000px";
    what.style.marginTop = "-5000px";
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
	var what = document.getElementById("what");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");

	//Ezkutatu beste atala
	home.style.marginTop = "-5000px";
    what.style.marginTop = "-5000px";
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
	var what = document.getElementById("what");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");

	//Ezkutatu beste atala
	home.style.marginTop = "-5000px";
    what.style.marginTop = "-5000px";
	gipuzkoa.style.marginTop = "-5000px";
	info.style.marginTop = "-5000px";
	akelarre.style.marginTop = "-5000px";
	//Estatistikak atala atzitu Ajax bidez
	$.ajax({
		method: 'POST',
		url: '../php/Experience.php',
		data: "",
		dataType: "text",
		cache : false,

	    success: function(mezua) {
	    	//Jasotako balioa txertatu atalean
	    	maria.innerHTML = mezua
			alert(mezua)
			maria.findElementById("script").each(function(){
				alert("ok")
				eval(document.getElementById('script').innerHTML)
			  });
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
    var what = document.getElementById("what");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var akelarre = document.getElementById("akelarre");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");
	//Ezkutatu beste atala
	gipuzkoa.style.marginTop = "-5000px";
    what.style.marginTop = "-5000px";
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
    var what = document.getElementById("what");
	var gipuzkoa = document.getElementById("gipuzkoa");
	var akelarre = document.getElementById("akelarre");
	var info = document.getElementById("info");
	var maria = document.getElementById("maria");
	//Ezkutatu beste atala
	gipuzkoa.style.marginTop = "-5000px";
    what.style.marginTop = "-5000px";
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