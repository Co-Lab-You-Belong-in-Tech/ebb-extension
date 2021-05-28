chrome.tabs.onUpdated.addListener( function(){
    chrome.tabs.executeScript({file:'/content-scripts/content.js'});
});