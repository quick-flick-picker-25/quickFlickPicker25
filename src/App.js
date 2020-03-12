import React, { Component } from 'react';
import './App.css';
import Lists from './Lists.js';
import MovieSearch from './MovieSearch.js';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import MovieDetails from './MovieDetails.js';
import WatchMovie from './WatchMovie.js';
import './movieSearchStyle.css';
import logo from './assets/qfpLogo.png';

class App extends Component {
  changeIcon=(event)=>{
    if (event.target.tagName ==="LABEL"){
      event.target.classList.toggle("change");
    }
    else {
      event.target.parentElement.classList.toggle("change");
    }
  }

  render() {
    return (
        <Router>
          <div className="App">
          {/* <!-- hamburger menu icon --> */}
            <label htmlFor="toggle" aria-hidden="true" className="toggle" onClick={this.changeIcon}>
            <div className="bar1" ></div>
            <div className="bar2" ></div>
            <div className="bar3"></div>
            </label>
            <span className="srOnly">main menu</span>
            <input type="checkbox" id="toggle" autoComplete="off" />
          <div className="listComponent"><Lists /></div>
          {/* <!-- end of hamburger menu icon --> */}
              <Route path="/quickFlickPicker25/:keyword?"  component={MovieSearch} />
              <Route path="/movies/:keyword?/:listName?/:movieID"  component={MovieDetails} />
              <Route
                exact
                path="/watch-movie/:listName"
                render={props => <WatchMovie listName={props.match.params.listName} key={props.match.params.listName}
                history={props.history}  />}
              />
          <div className="logoAndSearch" >
            <a href="/quickFlickPicker25/" title="Search Movies"><i className="fas fa-search"></i></a>
            <div className="logoImg">
              <img src={logo} alt="" />
            </div>
          </div>  
          </div>
        </Router>  
    );
  }
}

export default App;
