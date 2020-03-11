import React, { Component } from 'react';
import axios from 'axios';
import AddToLists from './AddToLists.js';
import './addToLists.css';
import {Link} from 'react-router-dom';

class MovieSearch extends Component {
    constructor() {
        super();
        this.state = {
            keyword: '',
            movies: [],

        }
    }
    componentDidMount(){
        if (typeof this.props.match.params.keyword !='undefined')
        {
            const keyword = this.props.match.params.keyword;
            console.log(keyword);
            // on component did mount, set mounted to true
            this.setState({
                // movieId: movieId,
                keyword: keyword,
            }, ()=>{
                this.searchForMovies();
            });
            

        }
      
    }
    handleKeyword = (event) => {
        this.setState({
            keyword: event.target.value,
        })
    }
    searchForMovies = ()=>{
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
                    return (movie.poster_path != null && movie.genres.length > 0 && movie.runtime !== null)
                });
                this.setState({
                    movies: filteredMovies,
                }, () => {
                    if (this.state.movies.length === 0) {
                        alert('No available titles');
                    }
                });
            });
        }).catch(() => {
            alert('Something went wrong!! Please try again later!!');
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.searchForMovies();
    }
    render() {
        return (
            <div className="movieSearchArea">
                <div className="wrapper">
                        <div className="movieSearchContainer">
                            {this.state.movies.length === 0 && typeof this.props.match.params.keyword == 'undefined'?
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
                                                    <AddToLists movieId={movie.id}/> 
                                                    <Link key={movie.id} to={`/movies/${this.state.keyword}/${movie.id}`}>
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
