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
            })

            console.log(movie)
        })
    }

    render(){
        return (
            <section className="movieDetails">
                <Link to="/">Back to results</Link>
                <h1>{this.state.movie.title}</h1>
            </section>
        )
    }
}

export default MovieDetails;