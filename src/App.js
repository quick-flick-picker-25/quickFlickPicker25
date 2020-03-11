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

class App extends Component {

  constructor(){
    super();

    this.state = {
      userLists: [],
      specificList: '',
    }
  }

  // make a function to update state globally (in parent)
  handleGetLists = (lists) => {
    // update own state with one from child component
    this.setState({
      userLists: lists,
    })
  }

  // make a function to update the list that will be filtered through
  handleGetSpecificList = (listName) => {
    console.log(listName.key);
    this.setState({
      specificList: listName.key,
    })
  }

  render() {
    return (
    <Router>
      <div className="App">
        <Lists updateParentListFunc = {this.handleGetLists} 
        // updateSpecificListFunc={this.handleGetSpecificList}
        />
          <Route path="/" exact component={MovieSearch} />
          <Route path="/movies/:movieID" exact component={MovieDetails} />
          <Route path="/watch-movie/:listName" exact component={WatchMovie}>
          {/* <Route paWatchMovie specificList ={this.state.specificList}/> */}
        </Route>
        {/* <Route path="/watch-movie/" render={()=><WatchMovie listName={this.state.specificList}/>} /> */}
      </div>
    </Router>  
    );
  }
}

export default App;
