import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import firebase from './firebase'
import './App.css';
import Lists from './Lists';
import MovieSearch from './MovieSearch';

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
      <div className="App">
        <Lists updateParentListFunc = {this.handleGetLists}/>
        <MovieSearch />
      </div>
    );
  }
}

export default App;
