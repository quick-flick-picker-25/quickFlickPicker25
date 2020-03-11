import React, { Component } from 'react';
import firebase from './firebase';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import './lists.css';

class Lists extends Component {
    constructor () {
        super ()
        this.state = {
            dbRef: firebase.database().ref(),
            usersList: [],
            userListName: '',
            userMovies: [],
        }
    }

    //Connect our state with firebase
    componentDidMount () {
        //on value change collect data
        this.state.dbRef.on('value', (response) => {
            const data = response.val();
            //make empty array
            const stateToSet = []
            //loop through our data
            for (let key in data) {
                const listData = {
                    key: key,
                    info: data[key]
                }
                //push each piece of data to our empty array
                stateToSet.push(listData);
            }
            //set state to our array
            this.setState({
                usersList: stateToSet,
            }, 
            // ()=>{
            //     this.props.updateParentListFunc(this.state.usersList);
            // }
            )
        })
    }

    // logs the changes when user types into input
    handleUserInput = (e)=>{
        this.setState({
            userListName: e.target.value,
        })
    }

    // make a function that records the value of the user input
    handleUserListName = (e) => {
        // prevent default action
        e.preventDefault();

        // checks if already have list with name
        const checkForSameName = this.state.usersList.find((list)=>{
            return list.key === this.state.userListName;
        })
        
        // check if the list is empty string
        if(this.state.userListName === ""){
            alert("please enter a name for your list!")
        } else if (checkForSameName){
            alert("You already have a list with that name!");
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
        const response = window.confirm(`Are you sure you want to delete list:${listToDelete}?`);
        if (response === true) {
            this.state.dbRef.child(listToDelete).remove();
        } 
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
        // make empty variable to store the reference key in DB 
        let refKey;
        // loop through and see if the id of the movie in DB matches the movie selected, make the reference key that specific movie
        for (let movie in listName.info) {

            if (listName.info[movie] === listName.key) {
                continue;
            }else if (listName.info[movie].id === movieObject.id) {
                refKey = movie;
            }
        }
        // console.log(refKey);
        // make variable to get the reference point in the database
        const reference = firebase.database().ref(listName.key);
        // delete the movie with the speicifc key
        reference.child(refKey).remove();
    }


    render() {
        return (
            <div className="yourLists">
                <div className="wrapper">
                    <h2>Your Lists:</h2>
                    <form className="listInput" action="" onSubmit={this.handleUserListName}>
                        <div className="listInputContainer">
                            <label className="labelHidden" htmlFor="listName">Please enter a list name</label>
                            <input onChange={this.handleUserInput} required type="text" id="listName" placeholder="New list name" value={this.state.userListName}/>
                        </div>
                        <div className="submitButtonContainer">
                            <button className="roundButton" type="submit"><i className="fas fa-plus"></i></button>
                        </div>
                    </form>
                    <ul className="movieListContainer">
                        {
                            this.state.usersList.map((list)=>{
                                return(
                                    <li className="dropDownList" key={list.key}>
                                        <h3>{list.key}</h3>
                                        <div className="movies">
                                            <a className="showMovies" href="/" onClick={this.handleReload}><i className="fas fa-chevron-down"></i></a>
                                            <ul className="moviesDisplayed">
                                                {
                                                this.handleMovieName(list).length===0 ? 
                                                <li> No movies in this list</li>:
                                                this.handleMovieName(list).map((movie, index) => {
                                                    return (
                                                        <li className="listItem" key={index}>
                                                            <p>{movie.title}</p>
                                                            <button className="deleteButton" onClick={() => { this.handleDeleteMovie(list, movie) }}><i className="fas fa-trash-alt"></i></button>
                                                        </li>
                                                    )
                                                })
                                            }
                                            </ul>
                                        </div>
                                        <Link to={`/watch-movie/${list.key}`} 
                                        // onClick={()=>{this.props.updateSpecificListFunc(list)}}
                                        >Watch Movie</Link> 
                                        {/* <Link to={`/watch-movie/${list.key}`}>Watch Movie</Link> */}
                                        {/* <Link to={{ pathname: `/watch-movie/`, state: {specificList: list.key}}}>Watch Movie</Link> */}
                                        <button onClick={() => { this.handleDeleteList(list.key) }}><i className="fas fa-trash-alt"></i></button>
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

