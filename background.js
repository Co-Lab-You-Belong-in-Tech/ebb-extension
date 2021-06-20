chrome.tabs.onUpdated.addListener(function(id, info, tab) {

    // This allows the main toggle to persist the vanish GIFs and pause animations effects when clicked "on"
    // chrome.storage.sync.get("main-toggle", function(data){
    //     if(data["main-toggle"]){
    //         chrome.tabs.sendMessage(
    //             tab.id, {
    //                 tabId: tab.id
    //             }
    //         );
    //     };
    // });

    // This allows the first sub-toggle to persist the vanish GIFs and pause animations effects when clicked "on"
    chrome.storage.sync.get("vanish-gifs-toggle", function(data){
        if(data["vanish-gifs-toggle"]){
            chrome.tabs.sendMessage(
                tab.id, {
                    tabId: tab.id
                }
            );
        };
    });
});
