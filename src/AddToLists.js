import React, { Component } from 'react';
import firebase from './firebase.js';
import './addToLists.css';
import GetMovieDetails from './GetMovieDetails.js';
import swal from 'sweetalert';

class AddToLists extends Component {

    constructor() {
        super();
        this.state = {
            userLists: [],
            movieDetails: null,
        }
    }

    componentDidMount() {
        // fetch all the lists from the database
        const dbRef = firebase.database().ref();
        dbRef.on('value', (response) => {
            const dataFromDb = response.val();
            const stateToBeSet = [];
            for (let key in dataFromDb) {
                const listInfo = {
                    key: key,
                }
                stateToBeSet.push(listInfo);
            }
            this.setState({
                userLists: stateToBeSet,
            })
        })
    }
    //to prevent the "+" from reloading
    handleReload = (event) => {
        event.preventDefault();
    }

    // a function to check if the movie is already in the list
    checkIfMovieExist = (listName, movieId) => {
        const stateToBeSet = [];
        const dbRef = firebase.database().ref(listName);
        dbRef.on('value', (response) => {
            const dataFromDb = response.val();
            for (let key in dataFromDb) {
                if (dataFromDb[key] === listName) {
                    continue;
                }
                stateToBeSet.push(dataFromDb[key].id);
            }
        });
        if (stateToBeSet.indexOf(movieId) > -1) {
            return true;
        }
        return false;
    }

    // to handle the click on the list name (add the movie to the list)
    clickHandler = (event, listName) => {
        event.preventDefault();
        const dbRef = firebase.database().ref(listName);
        const movieInfo = this.state.movieDetails;
        if (this.checkIfMovieExist(listName, movieInfo.id)) {
            swal({
                title: 'The movie is already in the list!',
                button: 'OK',
            })
        }
        else {
            //adding the movie to the list
            const genres = movieInfo.genres.map((genre) => {
                return genre.name
            })
            const details = {
                id: movieInfo.id,
                title: movieInfo.title,
                runtime: movieInfo.runtime,
                genre: genres
            }
            dbRef.push(details);
            swal({
                title: 'The movie has been added to the list successfully!',
                button: 'OK',
            })
        }
    }

    // this function is used to pass props from a child component (GetMovieDetails) to this component
    getMovieDetails = (movieDetails) => {
        this.setState({
            movieDetails: movieDetails,
        });
    }

    render() {
        const userLists = this.state.userLists;
        return (
            <div className="addToLists">
                <div className="listMenu">
                    <a href="/" onClick={this.handleReload} className="roundButton" >
                        <span aria-hidden="true" >&#43;</span>
                    </a>
                    <ul className="listSubMenu moviesDisplayed">
                        {userLists.map((list, index) => {
                            return (
                                <li key={index} className="listItem" onClick={(event) => { this.clickHandler(event, list.key) }}>
                                    <GetMovieDetails movieID={this.props.movieId}
                                        movieDetails={this.getMovieDetails} />
                                    <a href="/" className="listLinks" >{list.key}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default AddToLists;