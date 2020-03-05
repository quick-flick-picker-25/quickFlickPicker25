import React, { Component } from 'react';
import firebase from 'firebase';

class Lists extends Component {
    constructor () {
        super ()
        this.state = {
            dbRef: firebase.database().ref()
            usersList: [],
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
            })
        })
    }

    render() {
        return (
            <div>
                <h2>Your Lists</h2>
                <form action="">
                    <input type="text" placeholder="New list name" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Lists; 