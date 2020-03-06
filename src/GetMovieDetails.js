import React, { Component } from 'react';
import axios from 'axios'

class GetMovieDetails extends Component {
    componentDidMount(){
        axios ({
            url: `https://api.themoviedb.org/3/movie/${this.props.movieID}`,
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
            }
        }).then(response => {
            const movie = response.data;
            this.props.movieDetails(movie);
        })
    }

    render() {
        return(
            <div></div>
        )
    }
}
export default GetMovieDetails