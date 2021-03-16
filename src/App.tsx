import * as React from "react";
import * as ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  var tabs = Array<any>();
  
  function getTabsListFromStorage() {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(null, (t) => {
          //console.log(t);
          resolve(t);
        });
      } catch (error) {
        console.log(error);
        reject (error);
      }
    });
  }

  async function getTabsList() {
    let tabs = await getTabsListFromStorage();
    console.log('inside getTabsList()');
    console.log(tabs);
    return tabs;
  }
  
  let tabsList = getTabsList();
  console.log(typeof(tabsList));
  
  /*const listItems = tabsList.map((t) => {
      <li>{t.url}</li>;
  });*/
  
  console.log('listitems');
  //console.log(listItems);

  const numbers = [1, 2, 3, 4, 5];

  const numberList = numbers.map((number) =>
    <li>{number}</li>
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Please Learn React
        </a>
      </header>

      <ul>{numberList}</ul>
    </div>
  );
};

export default App;
