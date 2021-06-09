const vanish = document.querySelector("input[name=vanish]");
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

function setVanishStorage(isChecked) {
    chrome.storage.sync.set({ vanish: isChecked });
};

vanish.addEventListener("change", function() {
    console.log('I want to add a class.');
    addTransition();
    removeMessage();
    if (this.checked) {
        setVanishStorage(true)
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
        setVanishStorage(false);
        displayMessage();
    };
});

//html checkbox elements stored as an array of keys
const selections = [vanish];

function showChecked() {
    selections.forEach(function(checkbox) {
        /*
        each element in selections is a checkbox,
        by retrieving its element.name it can now be used as
        key for chrome.storage.sync.get
         */

        const toggle = checkbox.name;
        chrome.storage.sync.get([toggle], function(data) {
            if (data[toggle]) {
                /*
                Note that since type of toggle is string
                 it has to be escaped before it can be used as part of a selector.
                */
                document.querySelector("input[name=" + CSS.escape(toggle) + "]").setAttribute("checked", " ");
            };
        });
    });
};

window.addEventListener("DOMContentLoaded", showChecked);
