
// This will get executed on new tab

$('.search-form').on('submit', function (e) {
    e.preventDefault();
    var url = 'https://www.google.fr/#q=' + encodeURIComponent($(this).find('.search-input').val());
    var win = window.open(url, '_blank');
    if (win) {
        $(this).find('.search-input').val('');
        win.focus();
    } else {
        location.href = url;
    }
});

$('.google-link').on('click', function (e) {
    e.preventDefault();
    $('.search-input').focus(); 
});

chrome.storage.local.get('poulpy_weather', function (data) {
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

chrome.storage.local.get('poulpy_bank', function (data) {
    if (data.poulpy_bank) {
        $('.open-bank').attr('href', data.poulpy_bank);
    } else {
        $('.open-bank').on('click', function (e) {
            e.preventDefault();
            var url = chrome.extension.getURL('pages/options.html');
            chrome.tabs.update({url: url});            
        });
    }
});

$('.form-weather').on('click', function (e) {
    e.preventDefault();
    $(this).submit(); 
});
