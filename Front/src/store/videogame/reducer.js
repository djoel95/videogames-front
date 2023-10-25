import { GET_VIDEOGAMES, GET_VIDEOGAME, GET_GENRES, FILTER_VIDEOGAMES, ORDER, GET_PLATFORMS, GET_VIDEOGAME_NAME } from "./action-types";


const initialState = {
  videoGames: [],
  videoGame: [],
  videoGameBK: [],
  genres: [],
  platforms: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIDEOGAMES:
      return { ...state, videoGames: payload, videoGameBK: payload };

    case GET_VIDEOGAME:
      return { ...state, videoGame: payload };

    case GET_VIDEOGAME_NAME:
      return { ...state, videoGame: payload };

    case GET_GENRES:
      return { ...state, genres: payload };

    case GET_PLATFORMS:
      return { ...state, platforms: payload };

    case FILTER_VIDEOGAMES:
      return { ...state, videoGames: payload };
    case ORDER:
      const sortRatingResult = [...state.videoGames].sort((a, b) => {
        switch (payload) {
          case "AZ":
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
          case "ZA":
            return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
          case "ASC":
            return a.rating - b.rating;
          case "DES":
            return b.rating - a.rating;
          default:
            break;
        }
      });
      console.log(state.videoGames);
      return {
        ...state,
        videoGames: sortRatingResult, videoGameBK: sortRatingResult,
      };


    default:
      return { ...state };
  }
};

export default reducer;