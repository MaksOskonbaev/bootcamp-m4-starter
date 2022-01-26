const initialState = {
  filmList: [],
  movies: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FILM_TO_LIST": {
      const film = state.movies.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      let filmList = [...state.filmList, { ...film }];
      return {
        ...state,
        filmList,
      };
    }
    case "REMOVE_FILM_FROM_LIST": {
      const imdbID = action.payload.imdbID;
      const filmList = state.filmList.filter((item) => item.imdbID !== imdbID);
      return {
        ...state,
        filmList,
      };
    }
    case "FIND_FILMS": {
      const movies = action.payload.movies;
      return {
        ...state,
        movies: movies,
      };
    }
    default:
      return state;
  }
}
