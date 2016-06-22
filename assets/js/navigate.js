
// This will be runned once the page changes
// Bad url example: http://ianfette.org/

(function ($) {
    var redirect = function () {
        chrome.runtime.sendMessage({unsafe: true});
    };
    chrome.storage.local.get('poulpy_unsafe', function (data) {
        if (data && data.poulpy_unsafe && typeof data.poulpy_unsafe[window.location.hostname] == 'boolean') {
            if (data.poulpy_unsafe[window.location.hostname]) redirect();
        } else {
            $.ajax({
                url: 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyAaMNfBE77CYJTeSCgXT6YtDPxBGUT4KKI',
                method: 'POST',
                contentType: 'json',
                data: JSON.stringify({
                    "client": {
                        "clientId":      "Poulpy",
                        "clientVersion": "1.0.0"
                    },
                    "threatInfo": {
                        "threatTypes":      ["THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                        "platformTypes":    ["ANY_PLATFORM"],
                        "threatEntryTypes": ["URL"],
                        "threatEntries": [
                        {"url": window.location.href}
                        ]
                    }
                }),
                success: function (data) {
                    if (data && data.matches) {
                        chrome.storage.local.get('poulpy_unsafe', function (data) {
                            if (!data) data = {};
                            data[window.location.hostname] = true;
                            chrome.storage.local.set({'poulpy_unsafe': data}, function () {
                                chrome.storage.local.set({'poulpy_unsafe_latest': window.location.hostname}, function () {
                                    redirect();
                                });                        
                            });
                        });
                    }
                }
            });
        }
    });
})(jQuery);

$.noConflict();
