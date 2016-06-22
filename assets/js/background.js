
// This will get executed on background

setInterval((function loop() {

    $.ajax({
        url: 'https://mail.google.com/mail/u/0/feed/atom',
        dataType: 'xml',
        success: function (xml) {
            chrome.storage.local.set({'poulpy_mail': ~~$(xml).find('fullcount').text()});
        }
    });

    navigator.geolocation.getCurrentPosition(function (position) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=651e10753244afccb45c140b1dac2ef1",
            success: function (json) {
                // console.log(json);
                chrome.storage.local.set({'poulpy_weather': json});
            }
        });
    });

    return loop;

})(), 30 * 1000);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.unsafe === true) {
        var url = chrome.extension.getURL('pages/unsafe.html');
        chrome.tabs.update({url: url});
    }
});
