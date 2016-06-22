
// This will get executed on options page

$('.form-options').on('submit', function (e) {
    e.preventDefault();
    chrome.storage.local.set({poulpy_bank: $('.input-bank').val() }, function () {
        setTimeout(function () {
            chrome.tabs.update({url: 'chrome://newtab'});
        }, 1000);
    }); 
    $(this).find('.caption').text('Sauvegardé !');
});

chrome.storage.local.get('poulpy_bank', function (data) {
    if (data.poulpy_bank) {
        $('.input-bank').val(data.poulpy_bank);
    }
}); 

$('.link-home').on('click', function (e) {
    chrome.tabs.update({url:'chrome://newtab'});
});
