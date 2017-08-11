window.onresize = function(event) {
     chrome.extension.sendMessage({
        action: 'resized'
    });
};
