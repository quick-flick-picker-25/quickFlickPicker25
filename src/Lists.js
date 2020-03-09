import React, { Component } from 'react';
import firebase from './firebase';
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
            }, ()=>{
                this.props.updateParentListFunc(this.state.usersList);
                // console.log(this.state.usersList);
            })
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

        // create new reference point in database
        const newList = firebase.database().ref(this.state.userListName);

        // push the name on submit to create node in firebase
        newList.push(this.state.userListName);

        // set to empty string 
        this.setState({
            userListName: '',
        })

    }

    // make a function that deletes the specific list
    handleDeleteList = (listToDelete) => {
        // deletes the list
        this.state.dbRef.child(listToDelete).remove();
    }

    // prevents click of button
    handleReload = (e) => {
        e.preventDefault()
    }

    // takes in the reference and maps through the list to display the names of the movies
    handleMovieName = (object) => {
        const stateToSet = [];
        for(let movie in object.info) {
            // ignore the item in the object that holds the key
            if (object.info[movie] === object.key) {
                continue;
            }
            stateToSet.push(object.info[movie]);
            // console.log(movie)
        }
        //  return the array to map accross later
        return stateToSet;
    }

    // make function to delete the specific movie
    handleDeleteMovie = (listName, movieObject) => {
        // make empty variable to store the reference key in DB 
        let refKey;

        // loop through and see if the id of the movie in DB matches the movie selected, make the reference key that specific movie
        for (let movie in listName.info){
            if (listName.info[movie] === listName.key) {
                continue;
            } else if(listName.info[movie].id === movieObject.id){
                refKey = movie;
            }
        }

        // make variable to get the reference point in the database
        const reference = firebase.database().ref(listName.key);

        // delete the movie with the speicifc key
        reference.child(refKey).remove();
    }


    render() {
        
        return (
            <div>
                <h2>Your Lists</h2>
                <form action="" onSubmit={this.handleUserListName}>
                    <label htmlFor="listName">Please enter a list name</label>
                    <input onChange={this.handleUserInput} type="text" id="listName" placeholder="New list name" value={this.state.userListName}/>
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    {
                        this.state.usersList.map((list)=>{
                            return(
                                <li key={list.key} className="list">
                                    <h3>{list.key}</h3>
                                    <div className="movies">
                                        <a className="showMovies" href="" onClick={this.handleReload}>see list.</a>
                                        <ul className="moviesDisplayed">
                                            {this.handleMovieName(list).map((movie, index) => {
                                                return(
                                                    <li key={index}>
                                                        <p>{movie.title}</p>
                                                        <button onClick={()=>{this.handleDeleteMovie(list, movie)}}>Delete</button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <button onClick={()=>{this.handleDeleteList(list.key)}}>delete list.</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Lists; 

