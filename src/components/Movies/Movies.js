import React, { Component } from 'react';
import { connect } from "react-redux";
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    render() { 
      const { movies, filmList } = this.props
        return ( 
            <ul className="movies">
                {movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} 
                        disabled={filmList.find(el => el.imdbID === movie.imdbID)} />
                    </li>
                ))}
            </ul>
        );
    }
}
 

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        filmList: state.filmList
    }
};

const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(Movies);