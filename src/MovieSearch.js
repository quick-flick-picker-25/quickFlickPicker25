import React, { Component } from 'react';
import axios from 'axios';
import AddToLists from './AddToLists.js';
import './addToLists.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class MovieSearch extends Component {
    constructor() {
        super();
        this.state = {
            keyword: '',
            movies: [],
        }
    }
    componentDidMount() {
        // to check if the keyword is passed in the URL and this will happen only if the user clicks on "back to result link"
        if (typeof this.props.match.params.keyword != 'undefined') {
            const keyword = this.props.match.params.keyword;
            this.setState({
                keyword: keyword,
            }, () => {
                this.searchForMovies();
            });
        }
    }

    // to handle the changes of the keyword textbox
    handleKeyword = (event) => {
        this.setState({
            keyword: event.target.value,
        })
    }

    //to search for movies by a keyword in the api
    searchForMovies = () => {
        let moviesWithDetails = [];
        axios({
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
                query: this.state.keyword,
            }
        }).then((response) => {
            const movies = response.data.results;
            const promises = movies.map(async (movie) => {
                //to get the details for each movie 
                // we needed to do this beacuse the previous api call doesn't return the runtime of the movie
                const response = await axios({
                    url: `https://api.themoviedb.org/3/movie/${movie.id}`,
                    params: {
                        api_key: '8341ba99fae06408554c7e8411e4a4f9',
                    }
                });
                const movieDetails = response.data;
                moviesWithDetails.push(movieDetails);
            });
            Promise.all(promises).then(() => {
                const filteredMovies = moviesWithDetails.filter((movie) => {
                    //return only the movies with genre, poster and runtime
                    return (movie.poster_path != null && movie.genres.length > 0 && movie.runtime !== null)
                });
                this.setState({
                    movies: filteredMovies,
                }, () => {
                    if (this.state.movies.length === 0) {
                        swal({
                            title: 'No available titles',
                            button: 'OK',
                        })
                    }
                });
            });
        }).catch(() => {
            swal({
                title: 'Something went wrong!! Please try again later!!',
                button: 'OK',
            })
        });
    }

    // to handle the search form submitting
    handleSubmit = (event) => {
        event.preventDefault();
        this.searchForMovies();
    }

    render() {
        return (
            <div className="movieSearchArea">
                <div className="wrapper">
                    <div className="movieSearchContainer">
                        {/* two conditions to load the search form 1) no results yet and 2) there is no keyword in the url comming from "back to resullt" link in "MovieDetials" */}
                        {this.state.movies.length === 0 && typeof this.props.match.params.keyword == 'undefined' ?
                            <div className="movieHead">
                                <h1>quick flick picker</h1>
                                <form className="movieSearchForm" action="" onSubmit={this.handleSubmit}>
                                    <label htmlFor="keywordInput" className="visuallyHidden">enter a keyword to search for a movie</label>
                                    <input className="movieSearchBar" type="text" id="keywordInput" required onChange={this.handleKeyword} value={this.state.keyword} placeholder="Search for a movie..." />
                                    <button className="watchMovieBtn movieSearchButton" type="submit">find movie</button>
                                </form>
                            </div>
                            :
                            <ul className="moviePosterContainer">
                                {
                                    this.state.movies.map((movie) => {
                                        return (
                                            <li key={movie.id} className="moviePoster">
                                                <AddToLists movieId={movie.id} />
                                                <Link key={movie.id} to={`/movies/${this.state.keyword}/ /${movie.id}`}>
                                                    <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default MovieSearch;
