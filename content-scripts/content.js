chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    $("head").prepend(
        `<style>
            img[src*=".gif"] {
                opacity: 75%
            }
            img[src*=".GIF"] {
                opacity: 75%
            }
        </style>`
    );
    sendResponse({ fromcontent: "This message is from content.js" });
});
