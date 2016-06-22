
// This will get executed when clicking on icon

chrome.storage.local.get('poulpy_weather', function (data) {
    // console.log(data);
    var degree = data.poulpy_weather.main.temp - 273.15;
    var place = data.poulpy_weather.name;
    $(".meteo").html("Il fait actuellement " + ~~(degree * 10) / 10 + "°C");
    $(".place").html(place);
    $('.input-city').val(place);
});

chrome.storage.local.get('poulpy_mail', function (data) {
    if (!data.poulpy_mail) return;
    var mails = data.poulpy_mail;
    if (mails === 0) {
        $( ".mails" ).html("Vous n'avez pas de nouveau mail");
    } else if (mails === 1) {
        $( ".mails" ).html("Vous avez 1 nouveau mail");
    } else {
        $( ".mails" ).html("Vous avez " + mails + " nouveaux mails");
    }
});

$('.link-home').on('click', function (e) {
    chrome.tabs.create({});
});

$('.form-weather').on('click', function (e) {
    e.preventDefault();
    $(this).submit(); 
});
