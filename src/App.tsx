import * as React from "react";
import * as ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component<{}, {loading:boolean, title:string|null, data:Array<chrome.windows.Window>|null}> {
  constructor(props:any) {
    super(props);
    this.state = { loading: true, title: null, data: null };
  }

  renderList(data:any) {
    return data[0].tabs.map((n:chrome.tabs.Tab) => (
      <li><a href={n.url}>{n.title}</a></li>
    ))
  }

  componentWillMount() {
    let p = this.getTabsList();

    p.then((w:any) => { 
      console.log(w);
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
    const listItems = loading ? console.log('waiting...') : this.renderList(this.state.data);
      
    return (
       <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Written by <a style={{color: "white"}} href="mailto:jeremy.mark.went@gmail.com">Jeremy Went.</a></p>
          {/*<a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Please Learn React
          </a>*/}
        </header>
        <ul>{loading ? "loading..." : listItems}</ul>
      </div>
    );
  }
};

export default App;
