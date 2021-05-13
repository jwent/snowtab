(() => {
  try {
    //TODO: use a Promise.
    chrome.storage.local.get('windows', (items: { [key: string]: any; }) => {

      let windows = items.windows;
      const elem = document.getElementById("tabsListDiv");
    
      if (windows === undefined || windows == 0 || windows === false)
        return;
      windows.forEach((windows:any) => {
        if (windows.tabs !== undefined) {
          windows.tabs.forEach((t:any) => {
            elem!.innerHTML += `<li><a href="${t.url}">${t.url}</a></li>`;
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }

  document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("clearTabsBtn")?.addEventListener("click", function() {
      console.log("Clear local storage.");
      clearLocalStorage();
    });
  });
})() 

function clearLocalStorage() {
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
    else {
      location.reload();
    }
  });
}