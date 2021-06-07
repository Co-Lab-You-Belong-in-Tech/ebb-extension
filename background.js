
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
    chrome.storage.sync.get("toggleAll", function(data){
        if(data["toggleAll"]){
            chrome.tabs.sendMessage(
                tab.id, {
                    tabId: tab.id
                }
            );
        }
    });
});


   
    
