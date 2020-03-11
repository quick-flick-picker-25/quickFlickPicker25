import React, { Component } from 'react';
import firebase from './firebase.js';
import './watchMovie.css';
import swal from 'sweetalert';
import './sweetAlerts.css';

class WatchMovie extends Component {
    constructor() {
        super();
        this.state = {
            ListMovies: [],
            listGenres: [],
            selectedGenre: '',
            selectedTime: '',
            movieToWatch: '',
        };

    }
    getGenres = () => {
        const genres = [];
        this.state.ListMovies.forEach((movie) => {
            movie.name.genre.forEach((genre) => {
                genres.push(genre);
            });
        });
        const uniqueGenres = genres.filter((genre, index) => genres.indexOf(genre) === index);
        this.setState({
            listGenres: uniqueGenres,
        })
    }



    componentDidMount() {
        const dbRef = firebase.database().ref(this.props.listName);
        const stateToBeSet = [];
        dbRef.on('value', (response) => {
            const dataFromDb = response.val();
            for (let key in dataFromDb) {
                if (dataFromDb[key] === this.props.listName) {
                    continue;
                }
                const listInfo = {
                    key: key,
                    name: dataFromDb[key]

                }
                stateToBeSet.push(listInfo);
            }
            if (stateToBeSet.length !== 0) {
                this.setState({
                    ListMovies: stateToBeSet,
                }, () => {
                    this.getGenres();

                });
            }
        });
    }


    handleSubmit = (event) => {
        event.preventDefault();

        const genre = this.state.selectedGenre;
        if (this.state.selectedTime !== '' && genre !== '') {
            const movies = this.state.ListMovies;
            const time = parseInt(this.state.selectedTime);
            const  qualifyingMovies=movies.filter((movie)=>{
            return (parseInt(movie.name.runtime) <= time && movie.name.genre.indexOf(genre)>=0) 
        });
        if (qualifyingMovies.length === 0){
            swal({
                title: 'No matches in this list',
                button: 'OK',
            }) 
        }else{
            const selectedIndex=Math.floor(Math.random()*qualifyingMovies.length);
        
       this.setState({
           movieToWatch: qualifyingMovies[selectedIndex].name.id,
       },()=>{
               this.props.history.push(`/movies/${this.state.movieToWatch}`);
       }
       );
            
        }
    }
       else if(genre === '') {
            swal({
                title: 'Please select a genre!',
                button: 'OK',
            }) 
       }
       else {
            swal({
                title: 'Please select a time!',
                button: 'OK',
            }) 
       }

    }
    handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        this.setState({
            [id]: value,
        })
    }


    render() {
        return (
            //   this.state.movieToWatch==='' ?
            <section className="watchMovie">
                <div className="wrapper">
                    <div className="watchMovieContainer">
                        <h1>
                            watch a movie
                        </h1>
                        <form action="" onSubmit={this.handleSubmit}>

                            <div className="genreTimeString">

                                <div className="firstString">
                                    <p>I feel like watching a </p>
                                    <select id="selectedGenre" onChange={this.handleChange}>
                                        <option value="">genre</option>
                                        {
                                            this.state.listGenres.map((genre, index) => {
                                                return (
                                                    <option value={genre} key={index} >{genre}</option>

                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="secondString">           
                                    <p> movie and I have </p>
                                    <select id="selectedTime" onChange={this.handleChange}>
                                        <option value="">amount of time</option>
                                        <option value="90">Less than 1.5 hours</option>
                                        <option value="120">Less than 2 hours</option>
                                        <option value="240">All the time in the world </option>
                                    </select>
                                </div> 

                            </div>

                            <button className="watchMovieBtn findMovieBtn" type="submit">find movie</button>

                        </form>
                    </div>
                </div>
            </section>
            // :

            // <MovieDetails movieId={this.state.movieToWatch} />  
        )
    }
}

export default WatchMovie;