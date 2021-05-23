let stopGif = document.getElementById("stopGif");

if(stopGif) {
    stopGif.onclick = function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    imageDivId: `${guidGenerator()}`
                },
                function(response) {
                    window.close();
                }
            );
            function guidGenerator() {
                const S4 = function() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            }
        });
    };
}
