const vanish = document.querySelector("input[name=vanish]");
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

<<<<<<< HEAD
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
=======
function setVanishStorage(isChecked) {
    chrome.storage.sync.set({ vanish: isChecked });
};

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

vanish.addEventListener("change", function() {
    addTransition();
    if (this.checked) {
        setVanishStorage(true);
        removeMessage();
>>>>>>> ddaeb5451a3242fafd7fd34cd7798acae1bd69f1
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
<<<<<<< HEAD
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
=======
        setVanishStorage(false);
>>>>>>> ddaeb5451a3242fafd7fd34cd7798acae1bd69f1
        displayMessage();
    };
});

<<<<<<< HEAD
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

=======
>>>>>>> ddaeb5451a3242fafd7fd34cd7798acae1bd69f1
window.addEventListener("DOMContentLoaded", showChecked);
