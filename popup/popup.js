// const mainToggle = document.querySelector("input[name=main-toggle]");
const vanishGifsToggle = document.querySelector("input[name=vanish-gifs-toggle]");
// const pauseGifsToggle = document.querySelector("input[name=pause-gifs-toggle]");
// const altTextToggle = document.querySelector("input[name=alt-text-toggle]");
const reloadMessageBox = document.querySelector("#reload-message");
const toggles = document.querySelectorAll('span');

// Adds transition every time a toggle is clicked
function addTransition() {
    toggles.forEach((toggle) => {
        toggle.classList.add('toggle-transition');
    });
};

// Displays message when a toggle is clicked off
function displayMessage() {
    reloadMessageBox.textContent = "Please reload page to see the GIFs and animations.";
};

// Removes a displayed message when a toggle is clicked on again
function removeMessage() {
    reloadMessageBox.textContent = "";
};

// Stores status of toggle (input): on (checked) or off (unchecked)
// function setMainToggleStorage(isChecked) {
//     chrome.storage.sync.set({ "main-toggle": isChecked });
// };

function setVanishGifsStorage(isChecked) {
    chrome.storage.sync.set({ "vanish-gifs-toggle": isChecked });
};

// function setPauseGifsStorage(isChecked) {
//     chrome.storage.sync.set({ "pause-gifs-toggle": isChecked });
// };

// function setAltTextStorage(isChecked) {
//     chrome.storage.sync.set({ "alt-text-toggle": isChecked });
// };

// Inputs stored as an array of keys
// const selections = [mainToggle, vanishGifsToggle, pauseGifsToggle, altTextToggle];
// Currently, only this input is in use:
const selections = [vanishGifsToggle];

function showChecked() {
    selections.forEach(function(checkbox) {
        /* each element in selections is a checkbox, by retrieving its element.name it can now be used as key for chrome.storage.sync.get */

        const toggle = checkbox.name;
        chrome.storage.sync.get([toggle], function(data) {
            if (data[toggle]) {
                /* Note that since type of toggle is string it has to be escaped before it can be used as part of a selector. */
                document.querySelector("input[name=" + CSS.escape(toggle) + "]").setAttribute("checked", " ");
            };
        });
    });
};

// mainToggle.addEventListener("change", function() {
//     addTransition();
//     if (this.checked) {
//         setMainToggleStorage(true);
        // removeMessage();
        // This provides functionality for the main toggle to vanish GIFs and pause animations via content.js
        // chrome.tabs.query({},
        //     function(tabs) {
        //         tabs.forEach(function(tab) {
        //             chrome.tabs.sendMessage(
        //                 tab.id, {
        //                     tabId: tab.id
        //                 }
        //             );
        //         });
        //     }
        // );
//     } else {
//         setMainToggleStorage(false);
//         // displayMessage();
//     };
// });

vanishGifsToggle.addEventListener("change", function() {
    addTransition();
    if (this.checked) {
        setVanishGifsStorage(true);
        removeMessage();
        // This provides functionality for the first sub-toggle to vanish GIFs and pause animations via content.js
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
// pauseGifsToggle.addEventListener("change", function() {
//     addTransition();
//     if (this.checked) {
//         setPauseGifsStorage(true);
//     } else {
//         setPauseGifsStorage(false);
//     };
// });

//event listener for display alternative text
// altTextToggle.addEventListener("change", function() {
//     addTransition();
//     if (this.checked) {
//         setAltTextStorage(true);
//     } else {
//         setAltTextStorage(false);
//     };
// });

window.addEventListener("DOMContentLoaded", showChecked);
