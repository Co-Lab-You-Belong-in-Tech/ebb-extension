var checkbox = document.querySelector("input[name=checkbox]");


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

function showChecked(){
    chrome.storage.sync.get("checked", function(data){
        if(data["checked"]){
        checkbox.setAttribute("checked", "");// sets the checkbox attribute to its default value(true)
        }
    });
}

window.addEventListener('DOMContentLoaded', showChecked);
