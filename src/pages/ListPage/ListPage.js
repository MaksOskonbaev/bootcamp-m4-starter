import React, { Component } from "react";
import Header from "../../components/Header/Header";
import "./ListPage.css";

class ListPage extends Component {
  state = {
    movies: [],
    title: "",
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    // TODO: запрос к сервер на получение списка
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ title: data.title });
        data.movies.forEach((elem) => {
          fetch(`http://www.omdbapi.com/?i=${elem}&apikey=3f5d1a1b`)
            .then((res) => res.json())
            .then((data) => {
              this.setState({ movies: [...this.state.movies, data] });
            });
        });
      });
    // TODO: запросы к серверу по всем imdbID
  }
  render() {
    return (
      <div>
        <Header />
        <div className="list-page">
          <h1 className="list-page__title">{this.state.title}</h1>
          <ul>
            {this.state.movies.map((item) => {
              return (
                <li key={item.imdbID}>
                  <a
                    href={"https://www.imdb.com/title/" + item.imdbID}
                    className="link__block"
                    target="_blank"
                  >
                    {item.Title} ({item.Year})
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListPage;
