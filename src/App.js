import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase'
import './App.css';
import Lists from './Lists';

class App extends Component {
<<<<<<< HEAD
=======

  constructor(){
    super();

    this.state = {
      userLists: [],
    }
  }

  // make a function to update state globally (in parent)
  handleGetLists = (lists) => {
    // update own state with one from child
    this.setState({
      userLists: lists,
    }, ()=>{
      console.log(this.state.userLists);
    })
  }


>>>>>>> e9704369cb1b7d4758ec06954faa54366d0f5580
  render() {
    
  //  axios({
  //    'url': `https://api.themoviedb.org/3/genre/movie/list`,
  //     'method': 'GET',
  //     'dataType': 'json',
  //     'data': {
  //       'api_key': '8341ba99fae06408554c7e8411e4a4f9'
  //     }
  //  }).then((response) => { console.log(response) });;
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=8341ba99fae06408554c7e8411e4a4f9&language=en-US').then((response)=>{console.log(response)});
    return (
      <div className="App">
        <Lists />
      </div>
    );
  }
}

export default App;
