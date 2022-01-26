import React, { Component } from 'react';
import { addFilm} from "../../redux/action";
import { connect } from "react-redux";
import './MovieItem.css';

class MovieItem extends Component {
    // state = {
    //     textButton: 'Добавить в список'
    // }
    handlerChangeText = (imdbID) => {
        this.props.addFilm(imdbID);
        // this.setState({ textButton: 'Добавлено' });
        
    };
    render() {      
        const { Title, Year, Poster, imdbID, disabled } = this.props;
        
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" 
                    onClick={() => this.handlerChangeText(imdbID)}
                    disabled={disabled}
                    >Добавить в список</button>
                </div>
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addFilm: (imdbID) => dispatch(addFilm(imdbID))
});

export default connect(null, mapDispatchToProps)(MovieItem);