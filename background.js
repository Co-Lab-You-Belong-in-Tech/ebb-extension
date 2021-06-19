chrome.tabs.onUpdated.addListener(function(id, info, tab) {

    // chrome.storage.sync.get("main-toggle", function(data){
    //     if(data["main-toggle"]){
    //         chrome.tabs.sendMessage(
    //             tab.id, {
    //                 tabId: tab.id
    //             }
    //         );
    //     };
    // });

    chrome.storage.sync.get("vanish-toggle", function(data){
        if(data["vanish-toggle"]){
            chrome.tabs.sendMessage(
                tab.id, {
                    tabId: tab.id
                }
            );
        };
    });
});
