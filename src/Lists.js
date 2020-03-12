import React, { Component } from 'react';
import firebase from './firebase';
import {Link} from 'react-router-dom';
import './lists.css';
import swal from 'sweetalert';

class Lists extends Component {
    constructor () {
        super ()
        this.state = {
            dbRef: firebase.database().ref(),
            usersList: [],
            userListName: '',
        }
    }

    //Connect our state with firebase
    componentDidMount () {
        //on value change collect data
        this.state.dbRef.on('value', (response) => {
            const data = response.val();
            //make empty array
            const stateToSet = [];
            //loop through our data
            for (let key in data) {
                const listData = {
                    key: key,
                    info: data[key],
                }
                //push each piece of data to our empty array
                stateToSet.push(listData);
            }
            //set state to our array
            this.setState({
                usersList: stateToSet,
            })
        })
    }

    // logs the changes when user types into input
    handleUserInput = (e)=>{
        this.setState({
            userListName: e.target.value,
        });
    }

    // make a function that records the value of the user input
    handleUserListName = (e) => {
        // prevent default action
        e.preventDefault();

        // checks if already have list with name
        const checkForSameName = this.state.usersList.find((list)=>{
            return list.key === this.state.userListName;
        })
        
        // check if the name is already existing
         if (checkForSameName){
            swal({
                title: 'You already have a list with that name!',
                text: 'Please create a unique name for your list',
                button: 'OK',
            })
        } else {
            // create new reference point in database
            const newList = firebase.database().ref(this.state.userListName);
            // push the name on submit to create node in firebase
            newList.push(this.state.userListName);
        }

        // set to empty string 
        this.setState({
            userListName: '',
        })

    }

    // make a function that deletes the specific list
    handleDeleteList = (listToDelete) => {
        // deletes the list
        swal({
            title: `Are you sure you want to delete the list: ${listToDelete}?`,
            buttons: ["Cancel", "Yes please"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal({
                    title: `Your list was deleted!`,
                })
              this.state.dbRef.child(listToDelete).remove();
            }
          });
    }

    handleReload = (e) => {
        e.preventDefault();
    }

    handleMovieName = (object) => {
        const stateToSet = [];
        for(let movie in object.info) {
            if (object.info[movie] === object.key) {
                continue;
            }
            stateToSet.push(object.info[movie]);
        }
        return stateToSet;
    }

    handleDeleteMovie = (listName, movieObject) => {
        swal({
            title: `Are you sure you want to delete the movie: ${movieObject.title} from the list: ${listName.key}?`,
            buttons: ["Cancel", "Yes please"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
            // make empty variable to store the reference key in DB 
            let refKey;
            // loop through and see if the id of the movie in DB matches the movie selected, make the reference key that specific movie
            for (let movie in listName.info) {

                if (listName.info[movie] === listName.key) {
                    continue;
                } else if (listName.info[movie].id === movieObject.id) {
                    refKey = movie;
                }
            }
            // make variable to get the reference point in the database
            const reference = firebase.database().ref(listName.key);
            // delete the movie with the specifc key
            reference.child(refKey).remove();
            }
        }); 
    }

    handleMovieList = (e) => {
        //Get variable for button
        const button = e.currentTarget;

        //Make variables for close and open chevrons.
        const close = button.querySelector(".closeMovies");
        const open = button.querySelector(".showMovies");

        //Get variable for movies list by selecting parent and then next sibling.
        const movieList = button.parentNode.nextElementSibling;
        //In case lists are loading make sure the the movie list element is not null, so it will not break the code.
        if(movieList !== null){
            movieList.classList.toggle("activeMovieList");
        }

        //Hide Close/Hide Open
        close.classList.toggle("changeClose");
        open.classList.toggle("changeClose");
    }

hideLists =(event)=>{
    event.preventDefault();
}

    render() {
        return (
            <div className="yourLists" id={this.props.isHidden}>
                <div className="wrapper">
                    <div className="asideContainer">
                        <h2>Your Lists:</h2>
                        <form className="listInput" action="" onSubmit={this.handleUserListName}>
                            <div className="listInputContainer">
                                <label className="visuallyHidden" htmlFor="listName">Please enter a list name</label>
                                <input onChange={this.handleUserInput} required type="text" id="listName" placeholder="New list name" value={this.state.userListName}/>
                            </div>
                            <div className="submitButtonContainer">
                                <button className="roundButton" type="submit" title="Create a new list"><i className="fas fa-plus"></i></button>
                            </div>
                        </form>
                    </div>
            
                    <ul className="movieListContainer">
                        {
                            this.state.usersList.map((list)=>{
                                return(
                                    <li className="movieList" key={list.key}>
                                        <div className="dropDownContainer">
                                            <div className="dropDownButton" onClick={this.handleMovieList}>
                                                <h3>{list.key}</h3>
                                                <p className="showMovies" title="Open list"><i className="fas fa-chevron-down"></i></p>
                                                <p className="closeMovies changeClose" title="Close list"><i className="fas fa-times"></i></p>
                                            </div>
                                            <button onClick={() => { this.handleDeleteList(list.key) }} className="deleteListButton" title="Delete list"><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                        <div className="movies">
                                            <ul className="moviesDisplayed">
                                                {
                                                this.handleMovieName(list).length===0 ? 
                                                <li className="noMoviesText"> No movies in this list</li>:
                                                this.handleMovieName(list).map((movie, index) => {
                                                    return (
                                                        <li className="listItem" key={index}>
                                                            <p>{movie.title}</p>
                                                            <button className="deleteButton" onClick={() => { this.handleDeleteMovie(list, movie) }} title="Delete movie"><i className="fas fa-trash-alt"></i></button>
                                                        </li>
                                                    )
                                                })
                                            }
                                            </ul>
                                            <div className="linkContainer">
                                                {this.handleMovieName(list).length !== 0 ? <Link className="watchMovieBtn" to={`/watch-movie/${list.key}`}>Watch Movie</Link>
                                                    : null
                                                }


                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Lists; 

