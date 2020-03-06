import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';



class MovieDetails extends Component {
    constructor (){
        super();

        this.state = {
            movie: {},
            movieGenre: [],
            credits: {}
        }
    }

    componentDidMount = () => {
        axios ({
            url: `https://api.themoviedb.org/3/movie/${this.props.match.params.movieID}`,
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
            }
        }).then(response => {
            const movie = response.data;

            this.setState({
                movie: movie,
                movieGenre: movie.genres,
            })

            console.log(this.state.movieGenre)
        })

        axios({
            url: `https://api.themoviedb.org/3/movie/${this.props.match.params.movieID}/credits`,
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
            }
        }).then(response => {
            const  credits = response.data;

            const director = credits.filter((job) => {
                
            })
            

            // this.setState({
            //     movie: movie,
            //     movieGenre: movie.genres,
            // })

            // console.log(this.state.movie)
        })

    }

    render(){
    
        // console.log(this.state.movie.genres);
        // const genres = this.state.movie.genres;

        return (
            <section className="movieDetails">
                <Link to="/">Back to results</Link>
                <div>
                    <img src={`http://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} alt=""/>
                </div>

                <div>
                    <h1>{this.state.movie.title}</h1>
                    <div className="genres">
                        <h2>Genres</h2>
                        {/* {
                            this.state.movie.genres.map((genre, index) => {
                                return (
                                    <p key={index}>{genre.name}</p>
                                )
                            })
                        } */}
                    </div>
                    <div className="director">
                        <h2>Director</h2>
                     <p>{this.state.movie.director}</p>
                    </div>
                </div>

            </section>
        )
    }
}

export default MovieDetails;