import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
