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

  // constructor(){
  //   super();

  //   this.state = {
  //     userLists: [],
  //     specificList: '',
  //   }
  // }

  // make a function to update state globally (in parent)
  // handleGetLists = (lists) => {
  //   // update own state with one from child component
  //   this.setState({
  //     userLists: lists,
  //   })
  // }

  // make a function to update the list that will be filtered through
  // handleGetSpecificList = (listName) => {
  //   console.log(listName.key);
  //   this.setState({
  //     specificList: listName.key,
  //   })
  // }

  render() {
    return (
        <Router>
          <div className="App">
            <Lists 
            // updateParentListFunc = {this.handleGetLists} 
            // updateSpecificListFunc={this.handleGetSpecificList}
            />
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
