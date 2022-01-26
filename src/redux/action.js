export function addFilm(imdbID) {
  return {
    type: "ADD_FILM_TO_LIST",
    payload: {
      imdbID: imdbID,
    },
  };
}

export function removeFilm(imdbID) {
  return {
    type: "REMOVE_FILM_FROM_LIST",
    payload: {
      imdbID: imdbID,
    },
  };
}

export function findFilms(movies) {
  return {
    type: "FIND_FILMS",
    payload: {
      movies: movies,
    },
  };
} 