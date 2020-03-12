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
import './sweetAlerts.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      listsShown: true,
    }
  }

  // if the window is 860 px then hide the lists by default
  componentDidMount = () => {
    if(window.innerWidth <= 840){
      this.handleListsShow(false);
    }
  }


// handles whether the list is shown or hidden
  handleListsShow = (listState) => {
    this.setState({
      listsShown: listState,
    })
  }

  render() {
    return (
        <Router>
          <div className="App">
          <button className="showLists" onClick={() => { this.handleListsShow(true) }}>
            <i className="fas fa-list"></i></button>
          {
            this.state.listsShown ? <Lists
              hideListsFunc={this.handleListsShow} isHidden="false"/>
              : <Lists
              hideListsFunc={this.handleListsShow} isHidden="true"/>
          }

              <Route path="/quickFlickPicker25/:keyword?"  component={MovieSearch} />
              <Route path="/movies/:keyword?/:movieID"  component={MovieDetails} />
              <Route
                exact
                path="/watch-movie/:listName"
                render={props => <WatchMovie listName={props.match.params.listName} key={props.match.params.listName}
                history={props.history}  />}
              />
              {/* <div className="mainLogo" >
                <img src={logo} alt="" />
              </div> */}
          </div>
        </Router>  
    );
  }
}

export default App;
