import React, { Component } from 'react';
import firebase from './firebase.js';
import './addToLists.css';
import GetMovieDetails from './GetMovieDetails.js';

class AddToLists extends Component{
    constructor(){
        super();

        this.state = {
            userLists: [],
            movieDetails: null,
        }
    }

    componentDidMount(){
        const dbRef = firebase.database().ref();
        dbRef.on('value', (response) => {
            const dataFromDb = response.val();
            const stateToBeSet =[];
            for(let key in dataFromDb){
                const listInfo ={
                    key:key
                }
                stateToBeSet.push(listInfo)
            }
            this.setState({
                userLists: stateToBeSet
            })
        })
    }

    handleReload = (event) =>{
        event.preventDefault();
    }
    checkIfMovieExist =(dbRef, movieId) =>{
        const stateToBeSet = [];
        dbRef.on('value', (response) => {
            const dataFromDb = response.val();
            for (let key in dataFromDb) {
                if (dataFromDb[key] === 'list 3') {
                    continue;
                }
                stateToBeSet.push(dataFromDb[key].id)
            }
        });
        if(stateToBeSet.indexOf(movieId)>-1) {
            return true;
        }
        return false;

    }
    clickHandler = (event) => {
        event.preventDefault();
        const dbRef = firebase.database().ref(event.target.text);
        const movieInfo = this.state.movieDetails;
        if(this.checkIfMovieExist(dbRef, movieInfo.id))
        {
            alert('The movie is already in the list');
        }
        else {
            const genres = movieInfo.genres.map((genre) => {
                return genre.name
            })
            const details = {
                id: movieInfo.id,
                title: movieInfo.title,
                runtime: movieInfo.runtime,
                genre: genres
            }
            dbRef.push(details)
        }
    }

    getMovieDetails = (movieDetails) => {
        this.setState({
            movieDetails: movieDetails,
        })
    }

    render(){
        const userLists = this.state.userLists;
        return(
            <div className="addToLists">
                <div className="listMenu">   
                    <a href="/"  onClick={this.handleReload}>
                        <span aria-hidden="true">&#43;</span>
                    </a>
                    <ul className="listSubMenu">
                        {userLists.map((list, index) => {
                            return (
                                <li key={index}>
                                    <GetMovieDetails movieID={this.props.movieId} 
                                    movieDetails={this.getMovieDetails} />
                                    <a href="/" onClick={this.clickHandler}>{list.key}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div> 
            </div>
        )}
}

export default AddToLists;