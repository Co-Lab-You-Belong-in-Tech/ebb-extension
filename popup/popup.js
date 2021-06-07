var toggleAll = document.querySelector("input[name=toggleAll]");
var vanish =   document.querySelector("input[name=vanish]");
var  pause = document.querySelector("input[name=pause]");
var displayAlt = document.querySelector("input[name=displayAlt]");



toggleAll.addEventListener('change', function() {
          if(this.checked){
            chrome.storage.sync.set({toggleAll:true});
            chrome.tabs.query({},
                function(tabs) {
                    tabs.forEach(function(tab) {
                        chrome.tabs.sendMessage(
                            tab.id,
                            {
                                tabId: tab.id
                            },
                        );
                    })
                }
            );
          } else{
            // Removes the vanish effect when the toggle is clicked to the "off" position.
            chrome.storage.sync.set({toggleAll:false});
          }    
});


// event listener for Hide all Gifs toogle
vanish.addEventListener('change', function(){
     if(vanish.checked){
        chrome.storage.sync.set({vanish :true});
     }
     else{
        chrome.storage.sync.set({vanish:false});
     }
});

// event listener for pause gifs
pause.addEventListener('change', function(){
   if(pause.checked){
       //
       chrome.storage.sync.set({pause :true});

       
   }else{
    chrome.storage.sync.set({pause:false});
   }
});

//event listener for display alternative text 
displayAlt.addEventListener('change', function(){
    displayAltCheck =  displayAlt.checked;
    if(displayAltCheck){
        chrome.storage.sync.set({displayAlt :true});
        
    }else{
        chrome.storage.sync.set({displayAlt:false});
    }
});


//html elements are stored as an array of keys
var selections = [toggleAll,vanish,pause,displayAlt];

function showChecked(){
    selections.forEach(function(checkbox){
        /*each element in selections is a checkbox,
        by retrieving its element.name it can now be used as
        key for chrome.storage.sync.get
         */

        var v = checkbox.name;
        chrome.storage.sync.get([v],function(data){
           if(data[v]){
            /*Note that since type of v is string
             it has to be escaped before it can be used as part of a selector.
            */
            document.querySelector("input[name=" + CSS.escape(v) + "]").setAttribute("checked"," ");
            }
           
        });
    });

 }

window.addEventListener('DOMContentLoaded', showChecked);
