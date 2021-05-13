  console.log("Hello from content.ts");

  function getTabs() {
    try {
      chrome.storage.local.get('windows', (t) => {
        return(t);
      });
    } 
    catch (error) {
      console.log(error);
    }
  }

  