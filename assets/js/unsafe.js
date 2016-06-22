
// This will get executed when page is unsafe

$('.link-home').on('click', function (e) {
    chrome.tabs.update({url:'chrome://newtab'});
});

$('.go-back').on('click', function (e) {
    history.go(-2);
});

$('.go-continue').on('click', function (e) {
    chrome.storage.local.get('poulpy_unsafe', function (data) {
        if (!data) data = {};
        chrome.storage.local.get('poulpy_unsafe_latest', function (url) {
            data[url.poulpy_unsafe_latest] = false;
            chrome.storage.local.set({'poulpy_unsafe': data}, function () {
                history.go(-1);
            });
        });


    });
});
