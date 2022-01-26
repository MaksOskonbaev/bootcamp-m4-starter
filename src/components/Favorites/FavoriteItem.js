import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFilm } from "../../redux/action"

class FavoriteItem extends Component {
    render() {
        const { Title, Year, imdbID} = this.props;
        return (
            <div>
                <span>{Title} ({Year})</span>
                <button onClick={() => removeFilm(imdbID)}>X</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeFilm: (imdbID) => dispatch(removeFilm(imdbID))
});

export default connect(null, mapDispatchToProps)(FavoriteItem);