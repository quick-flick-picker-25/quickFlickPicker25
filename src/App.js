import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import firebase from './firebase'
import './App.css';
import Lists from './Lists';

class App extends Component {
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
