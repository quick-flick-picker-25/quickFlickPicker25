import React, { Component } from 'react';
import axios from 'axios';
// import firebase from './firebase';

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
                                    <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                );
                            })
                        }
                    </ul>
                }
            </div>
        );
    }
}
export default MovieSearch;