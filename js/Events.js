function getEvents(element){

        $.ajax({
            method: 'POST',
            url: '../php/GetEvents.php',
            data: {'id' : element.value},
            cache : false,

            success: function(mezua) {
                //Jasotako balioa txertatu atalean
                document.getElementById("events").innerHTML = mezua;
                
            },
            error: function(){
                alert("Arazo bat egon da Ajax erantzunean");
            }
        });
}