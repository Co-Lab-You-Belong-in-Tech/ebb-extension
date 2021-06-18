const mainToggle = document.querySelector("input[name=main-toggle]");
const vanishGifs = document.querySelector("input[name=vanish-toggle]");
const pauseGifs = document.querySelector("input[name=pause-toggle]");
const altText = document.querySelector("input[name=alt-text-toggle]");
const reloadMessageBox = document.querySelector("#reload-message");
const sliders = document.querySelectorAll('span');

function addTransition() {
    sliders.forEach((slider) => {
        slider.classList.add('slider-transition');
    });
};

function displayMessage() {
    reloadMessageBox.textContent = "Please reload page to see the GIFs and animations.";
};

function removeMessage() {
    reloadMessageBox.textContent = "";
};

function setMainToggleStorage(isChecked) {
    chrome.storage.sync.set({ "main-toggle": isChecked });
};

function setVanishGifsStorage(isChecked) {
    chrome.storage.sync.set({ "vanish-toggle": isChecked });
};

function setPauseGifsStorage(isChecked) {
    chrome.storage.sync.set({ "pause-toggle": isChecked });
};

function setAltTextStorage(isChecked) {
    chrome.storage.sync.set({ "alt-text-toggle": isChecked });
};

//html checkbox elements stored as an array of keys
const selections = [mainToggle, vanishGifs, pauseGifs, altText];

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

mainToggle.addEventListener("change", function() {
    addTransition();
    if (this.checked) {
        setMainToggleStorage(true);
        removeMessage();
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
        setMainToggleStorage(false);
        displayMessage();
    };
});

vanishGifs.addEventListener("change", function() {
    addTransition();
    if (this.checked) {
        setVanishGifsStorage(true);
        removeMessage();
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
        setVanishGifsStorage(false);
        displayMessage();
    };
});

// event listener for pause gifs
pauseGifs.addEventListener("change", function() {
    addTransition();
    if (pause.checked) {
        setPauseGifsStorage(true);
    } else {
        setPauseGifsStorage(false);
    };
});
    
//event listener for display alternative text
altText.addEventListener("change", function() {
    addTransition();
    if (altText.checked) {
        setAltTextStorage(true);
    } else {
        setAltTextStorage(false);
    };
});

window.addEventListener("DOMContentLoaded", showChecked);
