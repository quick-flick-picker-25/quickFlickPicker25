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
    clickHandler = (event,listName) => {
        event.preventDefault();
        const dbRef = firebase.database().ref(listName);
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
            dbRef.push(details);
            alert('The movie has been added to the list successfully');
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
                    <a href="/" onClick={this.handleReload} className="roundButton" >
                        <span aria-hidden="true" >&#43;</span>
                    </a>
                    <ul className="listSubMenu moviesDisplayed">
                        {userLists.map((list, index) => {
                            return (
                                <li key={index} className="listItem" onClick={(event) => { this.clickHandler(event,list.key)}}>
                                    <GetMovieDetails movieID={this.props.movieId} 
                                    movieDetails={this.getMovieDetails} />
                                    <a href="/" className="listLinks" >{list.key}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div> 
            </div>
        )}
}

export default AddToLists;