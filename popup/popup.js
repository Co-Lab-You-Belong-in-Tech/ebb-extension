var toggleAll = document.querySelector("input[name=toggleAll]");
var vanish = document.querySelector("input[name=vanish]");
var pause = document.querySelector("input[name=pause]");
var displayAlt = document.querySelector("input[name=displayAlt]");
const reloadMessageBox = document.querySelector("#reload-message");
const sliders = document.querySelectorAll('span');

function addTransition() {
    sliders.forEach((slider) => {
        slider.classList.add('slider-transition');
    });
};

function displayMessage() {
    console.log('displaying message');
    reloadMessageBox.textContent = "Please reload page to see the GIFs and animations.";
};

function removeMessage() {
    console.log('removing message');
    reloadMessageBox.textContent = "";
};

toggleAll.addEventListener("change", function() {
    console.log('I want to add a class.');
    addTransition();
    if (this.checked) {
        chrome.storage.sync.set({
            toggleAll: true
        });
        chrome.tabs.query({},
            function(tabs) {
                tabs.forEach(function(tab) {
                    chrome.tabs.sendMessage(
                        tab.id, {
                            tabId: tab.id
                        }
                    );
                })
            }
        );
    } else {
        /* Removes the vanish effect
         when the toggle is clicked to the "off" position.
         */
        chrome.storage.sync.set({
            toggleAll: false
        });
    };
});

// event listener for Hide all Gifs toogle
vanish.addEventListener("change", function() {
    addTransition();
    if (vanish.checked) {
        chrome.storage.sync.set({
            vanish: true
        });
        removeMessage();
    } else {
        chrome.storage.sync.set({
            vanish: false
        });
        displayMessage();
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
