// This file is ran as a background script

function logTabsForWindows(windowInfoArray: Array<chrome.windows.Window>) {
    const tabsDiv = document.createElement("div");
    const currentDiv = document.getElementById("tabsListDiv");    
    document.body.insertBefore(tabsDiv, currentDiv);

    
    console.log("New Version 2.0");
    console.log("background.js process..");

    try {
      chrome.storage.local.get('windows', (t) => {
        if (t.windows !== undefined && t.windows != 0 && t.windows !== false) {
          let tabs:Array<chrome.tabs.Tab> = t.windows.concat(windowInfoArray);
          
          if (tabs == undefined) {
            console.log("Tabs not working!");
          }

          //let tabsArr:Array<chrome.tabs.Tab> = tabs.entries();

          for (const [key, value] of Object.entries(tabs)) {
            console.log(`${key}: ${value}`);
          }

          //console.log(tabsArr);

          tabs.forEach((t:chrome.tabs.Tab) => {
            if (t.pendingUrl === undefined) {
              t.pendingUrl = String();
            }
            
            if (!t.pendingUrl!.includes('chrome-extension')) {
            }
          });

          chrome.storage.local.set({windows: tabs}, () => {
            closeTabs();
          });
        }
        else {
          chrome.storage.local.set({windows: windowInfoArray}, () => {
            closeTabs();
          });
        }
      });
    } 
    catch (error) {
      console.log(error);
    }

    for (let windowInfo of windowInfoArray) {
      windowInfo?.tabs?.reverse().map((tab:any) => {
        let a:HTMLAnchorElement = document.createElement('a');
        a.href = a.text = tab.url;

        let br = document.createElement('br');
        tabsDiv.appendChild(a);
        tabsDiv.appendChild(br);
      });
    }

    document.body.insertBefore(tabsDiv, currentDiv);
  }


function addTabsTab() {
    let actionUrl = "/popup.html";
    try {
      chrome.tabs.create({ url: actionUrl });
    } catch (error) {
      console.log(error);
    }

    try {
      let all_data = chrome.storage.local.get(null, (t) => {
      });
    } catch (error) {
      console.log(error);
    }
  }

chrome.browserAction.onClicked.addListener((tab) => {
    addTabsTab();

    var getting = chrome.windows.getAll({
        populate: true,
        windowTypes: ["normal", "popup", "panel", "devtools"]
      }, logTabsForWindows);
  });

  function closeTabs() {
    chrome.tabs.query({}, function (tabs:Array<chrome.tabs.Tab>) {
      console.log(tabs);
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].active !== true && tabs[i].pinned !== true) {
          chrome.tabs.remove(tabs[i].id!, () => {});
        }
      }
    }); 
  }

  //Test
  /*
  var getting = chrome.windows.getAll({
    populate: true,
    windowTypes: ["normal", "popup", "panel", "devtools"]
  }, logTabsForWindows);
  */
