
// This will get executed when clicking on icon

var mails = 4;

var meteo = 150;
$( ".meteo" ).html("Il fait actuellement " + meteo + "°C");

if (mails == 0) {
    $( ".mails" ).html("Vous n'avez pas de nouveau mail");
}else if (mails == 1){
    $( ".mails" ).html("Vous avez 1 nouveau mail");
}else{
    $( ".mails" ).html("Vous avez " + mails + " nouveaux mails");
}
