//let stopGif = document.getElementById("stopGif");

function allTabs() {
    chrome.tabs.query(
        { status: "complete" },
        function(tabs) {
            tabs.forEach(function(tab){
                chrome.tabs.sendMessage(
                    tab.id,
                    {
                        imageDivId: `${guidGenerator()}`,
                        tabId: tab.id
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
            })
    });
}
document.getElementById("vanishGif").addEventListener("click", allTabs);



 
