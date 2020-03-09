import React, { Component } from 'react';
import axios from 'axios';
import AddToLists from './AddToLists';
import './addToLists.css'
// import firebase from './firebase';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import brokenImage from "./brokenLink-01.png";
import MovieDetails from './MovieDetails';



class MovieSearch extends Component {
    constructor() {
        super();
        this.state = {
            keyword: '',
            movies: [],
        }
    }
    componentDidMount() {
    }
    handleKeyword = (event) => {
        this.setState({
            keyword: event.target.value,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios({
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
                query: this.state.keyword,
            }
        }).then((response) => {
// console.log(response)
            const movies = response.data.results;
            this.setState({
                movies,
            });
        })
    }
    render() {
        return (
            <div>
                {this.state.movies.length === 0 ?
                    <div>
                        <h1>quick flick picker</h1>
                        <form action="" onSubmit={this.handleSubmit}>
                            <label htmlFor="keywordInput" className="visuallyHidden">enter a keyword to search for a movie</label>
                            <input type="text" id="keywordInput" onChange={this.handleKeyword} value={this.state.keyword} placeholder="Search for a movie..." />
                            <button type="submit">find movie</button>
                        </form>
                    </div>
                    :
                    <ul>
                        {
                            this.state.movies.map((movie) => {
                                return (
                                    <Link key={movie.id} to={`/movies/${movie.id}`}>
                                        <li key={movie.id} className="listMenu">
                                            <AddToLists movieId={movie.id}/> 
                                            { movie.poster_path === null ? <img src={brokenImage} alt="Broken image" /> : <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                            }   
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                }

            </div>
        );
    }
}
export default MovieSearch;
