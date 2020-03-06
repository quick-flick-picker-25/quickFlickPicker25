import React, { Component } from 'react';
import firebase from 'firebase';
import './addToLists.css';

class AddToLists extends Component{
    constructor(){
        super();

        this.state = {
            userLists: [],
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

    render(){
        const userLists = this.state.userLists;
        return(
            <div className="addToLists">
                <div className="listMenu">   
                    <a href="" onClick={this.handleReload}>
                        <span aria-hidden="true">&#43;</span>
                    </a>
                    <ul className="listSubMenu">
                        {userLists.map((list) => {
                            return (
                                <li>
                                    {list.key}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )}
}

export default AddToLists;