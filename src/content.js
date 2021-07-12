function logTabsForWindows(windowInfoArray) {
    var newDiv = document.createElement("div");
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
    for (var _i = 0, windowInfoArray_1 = windowInfoArray; _i < windowInfoArray_1.length; _i++) {
        var windowInfo = windowInfoArray_1[_i];
        console.log("Window: " + windowInfo.id);
        console.log(windowInfo.tabs.map(function (tab) { return tab.url; }));
        windowInfo.tabs.map(function (tab) {
            var newContent = document.createTextNode(tab.url);
            newDiv.appendChild(newContent);
            var n = document.createElement('br');
            newDiv.appendChild(n);
        });
    }
    document.body.insertBefore(newDiv, currentDiv);
}
function closeTabs() {
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.remove(tabs[i].id, function () { });
        }
    });
}
chrome.browserAction.onClicked.addListener(function (tab) {
    var getting = chrome.windows.getAll({
        populate: true,
        windowTypes: ["normal", "popup", "panel", "devtools"]
    }, logTabsForWindows);
});
