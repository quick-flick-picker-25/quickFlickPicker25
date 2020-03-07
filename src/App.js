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

class App extends Component {

  constructor(){
    super();

    this.state = {
      userLists: [],
    }
  }

  // make a function to update state globally (in parent)
  handleGetLists = (lists) => {
    // update own state with one from child component
    this.setState({
      userLists: lists,
    })
  }


  render() {
    return (
    <Router>
      <div className="App">
        <Lists updateParentListFunc = {this.handleGetLists}/>
        <Route path="/" component={MovieSearch} />
        <Route path="/movies/:movieID" component={MovieDetails} />
      </div>
    </Router>  
    );
  }
}

export default App;
