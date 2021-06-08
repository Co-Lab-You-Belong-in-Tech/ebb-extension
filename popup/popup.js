var toggleAll = document.querySelector("input[name=toggleAll]");
var vanish = document.querySelector("input[name=vanish]");
var pause = document.querySelector("input[name=pause]");
var displayAlt = document.querySelector("input[name=displayAlt]");
const reloadMessageBox = document.querySelector("#reload-message");

function displayMessage() {
    console.log('displaying message');
    reloadMessageBox.textContent = "Please reload this page to see the GIFs.";
};

function removeMessage() {
    console.log('removing message');
    reloadMessageBox.textContent = "";
};

function setToggleAll(isChecked) {
    chrome.storage.sync.set({ toggleAll: isChecked });
};

function setVanish(isChecked) {
    chrome.storage.sync.set({ vanish: isChecked });
};

function setPause(isChecked) {
    chrome.storage.sync.set({ pause: isChecked });
};

function setDisplayAlt(isChecked) {
    chrome.storage.sync.set({ displayAlt: isChecked });
};

toggleAll.addEventListener("change", function() {
    if (this.checked) {
        setToggleAll(true);
        chrome.tabs.query({},
            function(tabs) {
                tabs.forEach(function(tab) {
                    chrome.tabs.sendMessage(
                        tab.id, {
                            tabId: tab.id
                        }
                    );
                });
            }
        );
    } else {
        /* Removes the vanish effect
         when the toggle is clicked to the "off" position.
         */
         setToggleAll(false);
    };
});

// event listener for Hide all Gifs toogle
vanish.addEventListener("change", function() {
    if (vanish.checked) {
        setVanish(true);
        removeMessage();
    } else {
        setVanish(false);
        displayMessage();
    };
});

// event listener for pause gifs
pause.addEventListener("change", function() {
    if (pause.checked) {
        setPause(true);
    } else {
        setPause(false);
    };
});

//event listener for display alternative text 
displayAlt.addEventListener("change", function() {
    if (displayAlt.checked) {
        setDisplayAlt(true);
    } else {
        setDisplayAlt(false);
    };
});

//html checkbox elements stored as an array of keys
var selections = [toggleAll, vanish, pause, displayAlt];

function showChecked() {
    selections.forEach(function(checkbox) {
        /*each element in selections is a checkbox,
        by retrieving its element.name it can now be used as
        key for chrome.storage.sync.get
         */

        var v = checkbox.name;
        chrome.storage.sync.get([v], function(data) {
            if (data[v]) {
                /*Note that since type of v is string
                 it has to be escaped before it can be used as part of a selector.
                */
                document.querySelector("input[name=" + CSS.escape(v) + "]").setAttribute("checked", " ");
            };
        });
    });

};

window.addEventListener("DOMContentLoaded", showChecked);
