import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddToLists from './AddToLists.js';
import GetMovieDetails from './GetMovieDetails.js';
import swal from 'sweetalert';


class MovieDetails extends Component {
    constructor (){
        super();
        this.state = {
            movieDetails: {},
            movieGenre: [],
            credits: {},
            directors: [],
            cast: [],
            videoLink:'',
            movieId:'',
            keyword:'',
            listName:'',
        } 
    }

    componentDidMount = () => {
        if (typeof this.props.match.params.keyword != 'undefined'){
            const keyword = this.props.match.params.keyword;
            if(keyword!==' ') {
                this.setState({
                    keyword: keyword,
                });
            }
        }
        if (typeof this.props.match.params.listName != 'undefined') {
            const listName = this.props.match.params.listName;
            if (listName !== ' ') {
            this.setState({
                listName: listName,
            })
        }
        }
        const movieId = this.props.match.params.movieID;
        this.setState({
            movieId:movieId,
        })

        // get cast and crew
        axios({
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
            }
        }).then(response => {
            const  credits = response.data;

            // if the job is directing, return to the new array
            const director = credits.crew.filter((crew) => {
              
                    return(crew.job === 'Director');
            })

            // take only first 5 cast members
            const cast = credits.cast.filter((castMember, index) => {
                    return index <= 4; // small change
            })
            
            // set state
            this.setState({
                directors: director,
                cast: cast,
            })
        }).catch(()=>{
            swal({
                text: 'Something went wrong!! Please try again later!!',
                button: 'OK',
            })
        });

        // get video link
        axios ({
            url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
            params: {
                api_key: '8341ba99fae06408554c7e8411e4a4f9',
            }
        }).then(response => {
            const videos = response.data;

            // check if video results is undefined
            if(videos.results[0] !== undefined){
                // set state
                this.setState({
                    videoLink: `https://www.youtube.com/embed/${videos.results[0].key}`,
                })

                // if it is undefined, set state to null
            } else {
                this.setState({
                    videoLink: null,
                })
            }
        }).catch(() => {
            swal({
                text: 'Something went wrong!! Please try again later!!',
                button: 'OK',
            })
        });

    }

    // call function to get movie details from other component
    getMovieDetails = (movieDetails) => {
        this.setState({
            movieDetails: movieDetails,
            movieGenre: movieDetails.genres,
        })
    }

    render(){    
        return (
            <section className="movieDetails">
                <div className="wrapper">                   
                    <div className="movieDetailContainer">
                        {this.state.keyword !== '' ?
                            <Link className="goBack" to={`/quickFlickPicker25/${this.state.keyword}`}>Back to results</Link>
                            : null}
                        {this.state.listName !== '' ?
                            <Link className="goBack" to={`/watch-movie/${this.state.listName}`}>Watch Another Movie</Link>
                            : null}
                        {this.state.movieId !=='' ? 
                        <div className="addButton">
                            <AddToLists movieId={this.state.movieId} /> 
                            <GetMovieDetails movieDetails={this.getMovieDetails} movieID={this.state.movieId}/>
                            </div>
                        : null} 
                      
                        <div className="detailsPage">
                            <div className="posterContainer">
                                <img src={`http://image.tmdb.org/t/p/w500/${this.state.movieDetails.poster_path}`} alt=""/>
                            </div>
                            <div className="movieInfo">

                                <h1 className="detailTitle">{this.state.movieDetails.title}</h1>
                                
                                <div className="threeDetails">
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
                                <div className="trailer">
                                    {this.state.videoLink === null ? null : 
                                    <a className="watchVideo" target="_blank" rel="noopener noreferrer"  href={this.state.videoLink}>Watch Trailer</a>
                                    }   
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

            </section>
        )
    }
}

export default MovieDetails;