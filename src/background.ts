// This file is ran as a background script
console.log("Hello from background script!")
var tabs = chrome.windows.getAll((w) => {
    console.log(w);    
});
console.log(tabs);
