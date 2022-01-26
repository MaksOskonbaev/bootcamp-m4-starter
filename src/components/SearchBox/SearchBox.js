import React, { Component } from "react";
import { findFilms } from "../../redux/action";
import "./SearchBox.css";
import { connect } from "react-redux";

class SearchBox extends Component {
  state = {
    searchLine: "",
  };
  searchLineChangeHandler = (e) => {
    this.setState({ searchLine: e.target.value });
  };
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
  };
  getData = () => {

    let movies = []
    fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=3f5d1a1b`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === 'True'){
                movies = data.Search;
                this.props.findFilms(movies)
            } else {
                this.props.findFilms(movies)
                alert('Не корректные данные')
            }
        })
  };
  render() {
    const { searchLine } = this.state;

    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={searchLine}
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchLine}
            onClick={() => this.getData()}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  findFilms: (searchLine) => dispatch(findFilms(searchLine)),
});

export default connect(null, mapDispatchToProps)(SearchBox);
