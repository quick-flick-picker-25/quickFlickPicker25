import React, { Component } from 'react';
import firebase from './firebase';

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

    // make a function that deletes the list
    handleDeleteList = (listToDelete) => {
        // deletes the list
        this.state.dbRef.child(listToDelete).remove();
    }

    render() {
        return (
            <div>
                <h2>Your Lists</h2>
                <form action="" onSubmit={this.handleUserListName}>
                    <input onChange={this.handleUserInput} type="text" placeholder="New list name" value={this.state.userListName}/>
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    {
                        this.state.usersList.map((list)=>{
                            return(
                                <li key={list.key}>
                                    <h3>{list.key}</h3>
                                    <button>see list.</button>
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