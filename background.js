
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
    chrome.storage.sync.get("vanish", function(data){
        if(data["vanish"]){
            chrome.tabs.sendMessage(
                tab.id, {
                    tabId: tab.id
                }
            );
        }
    });
});


   
    
