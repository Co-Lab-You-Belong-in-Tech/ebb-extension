
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
    chrome.storage.sync.get("checked", function(data){
        if(data["checked"]){
            chrome.tabs.sendMessage(
                tab.id, {
                    tabId: tab.id
                }
            );
        }
    });
});


   
    
