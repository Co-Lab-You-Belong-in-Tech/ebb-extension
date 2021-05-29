let stopGif = document.getElementById("stopGif");

if(stopGif) {
    stopGif.onclick = function() {
        chrome.tabs.query(
            { status: "complete" },
            function(tabs) {
                tabs.forEach(function(tab){
                    chrome.tabs.sendMessage(
                        tab.id,
                        {
                            tabId: tab.id
                        },
                        function(response) {
                            window.close();
                        }
                    );
                })
            }
        );
    };
}
