var checkbox = document.querySelector("input[name=checkbox]");
// we also need to save the changes of each selection so when
// the popup is selected the previous state remains
// this is different from the content scipts persisting
// At this moment it only turns the vanishing effect on not off.
checkbox.addEventListener('change', function() {
    if (this.checked) {
        chrome.storage.sync.set({checked:true});
        chrome.tabs.query({},
            function(tabs) {
                tabs.forEach(function(tab) {
                    chrome.tabs.sendMessage(
                        tab.id,
                        {
                            tabId: tab.id
                        },
                        /*
                        function(response) {
                            window.close();
                            *
                        }
                        this code closesthe popup window without showng effects
                        */
                    );
                })
            }
        );   
    }

    // Removes the vanish effect when the toggle is clicked to the "off" position.
    if (!this.checked) {
        chrome.storage.sync.set({checked:false});
    }
});

