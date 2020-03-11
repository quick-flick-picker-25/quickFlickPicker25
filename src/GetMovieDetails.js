import { Component } from 'react';
import axios from 'axios'

class GetMovieDetails extends Component {
    componentDidMount(){
        if(typeof this.props.movieID != "undefined"){
                axios ({
                    url: `https://api.themoviedb.org/3/movie/${this.props.movieID}`,
                    params: {
                        api_key: '8341ba99fae06408554c7e8411e4a4f9',
                    }
                }).then(response => {
                    const movie = response.data;
                    this.props.movieDetails(movie);
                }).catch(() => {
                    alert('Something went wrong!! Please try again later!!');
                });
        } 
    }

    render() {
        return(null);
    }
}
export default GetMovieDetails