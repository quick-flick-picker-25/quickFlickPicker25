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
            }, ()=>{
                this.props.updateParentListFunc(this.state.usersList);
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

    handleReload = (e) => {
        e.preventDefault()
    }

    handleMovieName = (object) => {
        const stateToSet = [];
        for(let movie in object.info) {
            if (object.info[movie] === object.key) {
                continue;
            }
            stateToSet.push(object.info[movie].title);
        }
        return stateToSet;
    }

    render() {
        return (
            <div className="yourLists">
                <div className="wrapper">
                    <h2>Your Lists:</h2>
                    <form className="listInput" action="" onSubmit={this.handleUserListName}>
                        <label className="labelHidden" htmlFor="listName">Please enter a list name</label>
                        <input onChange={this.handleUserInput} type="text" id="listName" placeholder="New list name" value={this.state.userListName}/>
                        <button className="roundButton" type="submit">
                            <i class="fas fa-plus"></i>
                        </button>
                    </form>
                    <ul>
                        {
                            this.state.usersList.map((list)=>{
                                return(
                                    <li className="dropDownList" key={list.key}>
                                        <h3>{list.key}</h3>
                                        <div className="movies">
                                            <a className="showMovies" href="" onClick={this.handleReload}>
                                                <i class="fas fa-chevron-down"></i>
                                            </a>
                                            <ul className="moviesDisplayed">
                                                {this.handleMovieName(list).map((movie, index) => {
                                                    return(
                                                        <li key={index}>
                                                            <p>{movie}</p>
                                                            <button>
                                                                <i class="fas fa-trash-alt"></i>
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        {/* <Link to={`/watch-movie/${list.key}`}>Watch Movie</Link> */}
                                        <Link to={{ pathname: `/watch-movie/`, state: {specificList: list.key}}}>Watch Movie</Link>
                                        <button onClick={() => { this.handleDeleteList(list.key) }}><i class="fas fa-trash-alt"></i></button>
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

