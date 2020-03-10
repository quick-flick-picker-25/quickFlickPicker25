import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import firebase from './firebase'
import './App.css';
import Lists from './Lists';

import MovieSearch from './MovieSearch';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import MovieDetails from './MovieDetails';
import WatchMovie from './WatchMovie';

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
        <Lists updateParentListFunc = {this.handleGetLists} updateSpecificListFunc={this.handleGetSpecificList}/>
        <Route path="/" exact component={MovieSearch} />
        <Route path="/movies/:movieID" component={MovieDetails} />
        <Route path="/watch-movie/" exact>
          <WatchMovie specificList ={this.state.specificList}/>
        </Route>
        {/* <Route path="/watch-movie/" render={()=><WatchMovie listName={this.state.specificList}/>} /> */}
      </div>
    </Router>  
    );
  }
}

export default App;
