function logTabsForWindows(windowInfoArray: Array<any>) {
    const newDiv = document.createElement("div");
    const currentDiv = document.getElementById("div1");    
    document.body.insertBefore(newDiv, currentDiv);

    try {
      chrome.storage.local.set({windows: windowInfoArray}, () => {
      });
    } 
    catch (error) {
      console.log(error);
    }

    for (let windowInfo of windowInfoArray) {
      //console.log(`Window: ${windowInfo.id}`);
      /*windowInfo.tabs.map((tab:any) => {
        console.log(tab)
      });*/
      
      windowInfo.tabs.map((tab:any) => {
        let a:HTMLAnchorElement = document.createElement('a');
        a.href = a.text = tab.url;

        let br = document.createElement('br');
        newDiv.appendChild(a);
        newDiv.appendChild(br);
      });
    }

    document.body.insertBefore(newDiv, currentDiv);
  }

  function closeTabs() {
    chrome.tabs.query({}, function (tabs:Array<chrome.tabs.Tab>) {
       for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.remove(tabs[i].id!, () => {});
      }
    }); 
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
      },
      logTabsForWindows);

      //chrome.storage.local.remove('key');
      //chrome.storage.local.remove('tabs');
      //closeTabs();
  });