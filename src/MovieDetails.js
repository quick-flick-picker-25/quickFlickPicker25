import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import AddToLists from './AddToLists';
import GetMovieDetails from './GetMovieDetails';



class MovieDetails extends Component {
    constructor (props){
        super();

        this.state = {
            movieDetails: {},
            movieGenre: [],
            credits: {},
            directors: [],
            cast: [],
            videoLink:'',
            movieDetails: {},
            isMounted: false,
            // movieId: props.match.params.movieID,
        }

        
    }

    componentDidMount = () => {

        // on component did mount, set mounted to true
        this.setState({
            isMounted: true,
            
        })

        // get cast and crew
        axios({
            url: `https://api.themoviedb.org/3/movie/${this.props.match.params.movieID}/credits`,
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
            }
        }).then(response => {
            const  credits = response.data;

            // if the job is directing, return to the new array
            const director = credits.crew.filter((crew) => {
                if(crew.job === 'Director'){
                    return crew;
                }
            })

            // take only first 5 cast members
            const cast = credits.cast.filter((castMember, index) => {
                if(index <= 4){
                    return castMember;
                }
            })
            
            // set state
            this.setState({
                directors: director,
                cast: cast,
            })
        })

        // get video link
        axios ({
            url: `https://api.themoviedb.org/3/movie/${this.props.match.params.movieID}/videos`,
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
            }
        }).then(response => {
            const videos = response.data;

            // set state
            this.setState({
                videoLink: `https://www.youtube.com/embed/${videos.results[0].key}`
            })
        })

    }

    // call function to get movie details from other component
    getMovieDetails = (movieDetails) => {
        this.setState({
            movieDetails: movieDetails,
            movieGenre: movieDetails.genres,
        })
    }

    // on component did unmount set the state to false
    componentWillUnmount = () => {
        this.setState({
            isMounted: false,
        })
    }

    render(){    
        return (
            <section className="movieDetails">
                <GetMovieDetails movieDetails={this.getMovieDetails} movieID={this.props.match.params.movieID}/>
                {/* if the state is mounted, include add to lists, if not make it null; this is to fix and error we were having */}
                {this.state.isMounted ? <AddToLists movieId={this.state.movieDetails.id} /> : null} 
                <Link to="/">Back to results</Link>
                <div>
                    <img src={`http://image.tmdb.org/t/p/w500/${this.state.movieDetails.poster_path}`} alt=""/>
                </div>

                <div>
                    <h1>{this.state.movieDetails.title}</h1>
                    <div className="genres">
                        <h2>Genres</h2>
                        {/* map through the genres, and display them */}
                        {
                            this.state.movieGenre.map((genre, index) => {
                                return (
                                    <p key={index}>{genre.name}</p>
                                )
                            })
                        }
                    </div>
                    <div className="director">
                        <h2>Director</h2>
                        {/* map through the directors and display them */}
                        {
                            this.state.directors.map((director)=>{
                                return(
                                    <p key={director.credit_id}>{director.name}</p>
                                )
                            })
                        }
                    </div>
                    <div className="cast">
                        <h2>Cast</h2>
                        {/* map through the cast members and display */}
                        {
                            this.state.cast.map((actor)=>{
                                return(
                                    <p key={actor.credit_id}>{actor.name}</p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <p>{this.state.movieDetails.overview}</p>
                </div>
                <a className="watchVideo" href={this.state.videoLink}>Watch Trailer</a>
            </section>
        )
    }
}

export default MovieDetails;