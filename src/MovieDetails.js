import React, { Component } from 'react';
import axios from 'axios';



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
            console.log(this.state.movie);
            
        })
    }

    render(){

        // console.log(this.state.movie);
        return (
            <section className="movieDetails">
                
            </section>
        )
    }
}

export default MovieDetails;