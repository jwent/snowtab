import * as React from "react";
import * as ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component<{}, {loading:boolean, title:string|null, data:Array<chrome.windows.Window>|null}> {
  constructor(props:any) {
    super(props);
    this.state = { loading: true, title: null, data: null };
  }

  renderList(windows:any) {
    var html:Array<React.ReactNode> = Array<React.ReactNode>();

    windows?.forEach((window:any) => {
      html.push(window.tabs?.map((n:chrome.tabs.Tab) => (
        <li><a href={n.url} target="_blank">{(n?.title?.length ?? 0 > 0) ? n.title : n.url} - {n.url}</a></li>
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

  
  render () {
    const { loading, title, data } = this.state;
    const tabsList:Array<React.ReactNode> = loading ? [<p>'waiting...'</p>] : this.renderList(this.state.data);
      
    return (
       <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Written by <a style={{color: "white"}} href="mailto:jeremy.mark.went@gmail.com">Jeremy Went.</a></p>
        </header>
        <ul>{tabsList}</ul>
      </div>
    );
  }
};

export default App;
