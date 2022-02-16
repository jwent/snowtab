import * as React from "react";
import * as ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

class App extends React.Component<{}, {loading:boolean, title:string|null, data:Array<chrome.windows.Window>|null}> {
  constructor(props:any) {
    super(props);
    this.state = { loading: true, title: null, data: null };
  }

  renderList(windows:any) {
    var html:Array<React.ReactNode> = Array<React.ReactNode>();

    windows?.forEach((window:any) => {
      html.push(window.tabs?.map((n:chrome.tabs.Tab) => (
        /*<li className="list-group-item"><img src={n.favIconUrl} width="25"></img>&nbsp;<a href={n.url} target="_blank">{(n?.title?.length ?? 0 > 0) ? n.title : n.url} - {n.url}</a></li>*/
        <li className="list-group-item"><a href={n.url} target="_blank">{(n?.title?.length ?? 0 > 0) ? n.title : n.url} - {n.url}</a></li>
      )))
    });

    return html.reverse();
  }

  componentWillMount() {
    let p = this.getTabsList();

    p.then((w:any) => {
      this.setState({loading: false, title:'whatever...', data: w.windows});
    });

  }

  /*
  componentDidMount() {
  }
  */

  getTabsListFromStorage():Promise<object> {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get('windows', (t) => {
          resolve(t);
        });
      } catch (error) {
        console.log(error);
        reject (error);
      }
    });
  }

  async getTabsList() {
    let tabs = await this.getTabsListFromStorage();
    return tabs;
  };

  clearLocalStorage() {
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

  tabsLocalStorage() {
    chrome.storage.local.get('windows', (t) => {
    try {
      Axios({
        method: 'post',
        url: "http://localhost:8001/tabs",
        data: t,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
      })
    }
    catch(errors) {
        console.log("errors", errors)
    }
    
    console.log(t);
    });
  }
    
  render () {
    const { loading, title, data } = this.state;
    const tabsList:Array<React.ReactNode> = loading ? [<p>'waiting...'</p>] : this.renderList(this.state.data);
      
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Written by <a style={{color: "white"}} href="mailto:jeremy.mark.went@gmail.com">Jeremy Went.</a></p>
        </header>
        

        <div className="container-fluid px-4">
          <div className="row gx-5">
            <div className="p-3 col-xm">
              <button id="clearTabsBtn" type="button" className="btn btn-danger" onClick={this.clearLocalStorage}>Clear Tabs List</button>
            </div>
            <div className="p-3 col-xm">
              <button id="StoreTabsBtn" type="button" className="btn btn-danger" onClick={this.tabsLocalStorage}>Store Tabs List</button>
            </div>
          </div>

          <div className="row mt-0 p-0 gx-5">
            <div className="col-xm">
              <ul className="list-group list-group-flush">{tabsList}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
