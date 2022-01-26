import React, { Component } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import { removeFilm } from "../../redux/action";

class Favorites extends Component {
  state = {
    title: "",
    textLink: "#",
    inputActive: true,
    linkActive: false,
  };

  handleInput = (e) => {
    this.setState({ title: e.target.value });
  };

  handleSaveList = () => {
    this.setState({
      inputActive: false,
      linkActive: true,
    });
    this.saveMovies();
  };

  saveMovies = () => {
    fetch("https://acb-api.algoritmika.org/api/movies/list", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        movies: this.props.filmList.map((el) => el.imdbID),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ textLink: data.id });
      });
  };
  render() {
    const { filmList, removeFilm } = this.props;
    return (
      <div className="favorites">
        <input
          value={this.state.title}
          onChange={this.handleInput}
          disabled={this.state.inputActive ? null : "disabled"}
          className="favorites__name"
          placeholder="Новый список"
        />
        <ul className="favorites__list">
          {filmList.map((item) => {
            return (
              <li className="favorites__list--item" key={item.imdbID}>
                <p className="favorites__list--title">
                  {item.Title} {item.Year}
                </p>
                <button
                  className="favorites__list--delete"
                  onClick={() => removeFilm(item.imdbID)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <div>
          <button
            type="button"
            onClick={() => this.handleSaveList()}
            className={`favorites__save ${
              this.state.linkActive ? "link__none" : null
            }`}
          >
            Сохранить список
          </button>
          <a
            href={`http://localhost:3000/list/${this.state.textLink}`}
            className={`link__none ${
              this.state.linkActive ? "link__block" : null
            }`}
            target="_blank"
          >
            Перейти
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filmList: state.filmList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFilm: (id) => dispatch(removeFilm(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

// const mapStateToProps = (state) => {
//   return {
//     movies: state.movies,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   removeFilm: (imdbID) => dispatch(removeFilm(imdbID))
// });

// export default connect(mapStateToProps, mapDispatchToProps) (Favorites);
