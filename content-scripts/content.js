
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    $("head").prepend(
        `<style>
            img[src*=".gif"] {
                opacity: 0%;
            }
            img[src*=".GIF"] {
                opacity: 0%;
            }
            img[alt*="gif"] {
                opacity: 0%;
            }
            img[alt*="GIF"] {
                opacity: 0%;
            }
        </style>`
    );
    sendResponse({ fromcontent: "This message is from content.js" });
});

