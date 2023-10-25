import {
  GET_VIDEOGAME,
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_PAGINATE_CHARACTER,
  GET_PLATFORMS,
  GET_VIDEOGAME_NAME,
  FILTER_VIDEOGAMES,
  ORDER
} from "./action-types";
import {  actionObject } from "../../utils";
import { VIDEOGAME_API_URL, URL } from "../../utils/path";
import axios from "axios";
// Función para traer todos los videoGames
export const getAllVideogames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(VIDEOGAME_API_URL);
      return dispatch({ type: GET_VIDEOGAMES, payload: data });
    } catch (error) {
      window.alert(error?.data || "Ha ocurrido un error");
    }
  };
};

// Función para traer videoGames por su id
export const getVideogame = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${VIDEOGAME_API_URL}${id}`);
      if (data.name) return dispatch({ type: GET_VIDEOGAME, payload: data });
      window.alert("No se encontró el videojuego");
    } catch (error) {
      window.alert(error?.data || "Ha ocurrido un error");
    }
  };
};

// Función para traer videoGames por su Name
export const getVideogameName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${VIDEOGAME_API_URL}/${name}`);
      if (data.name) return dispatch(actionObject(GET_VIDEOGAME_NAME, data));
      window.alert("No se encontró el videojuego");
    } catch (error) {
      window.alert(error?.data || "Ha ocurrido un error");
    }
  };
};
// Función para ordernar todos los videoGames
export const getVideogamesSorted = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`${VIDEOGAME_API_URL}`);
    const videoGames = apiData.data;
    const sortedVideoGameAZ = videoGames.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    dispatch({ type: GET_SORTED_AZ, payload: sortedVideoGameAZ });
  };
};
// Función para paginado
export const getPaginateCharacters = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        `${VIDEOGAME_API_URL}character?page=${page}`
      );
      return dispatch(actionObject(GET_PAGINATE_CHARACTER, response?.data));
    } catch (error) {
      window.alert(error?.data || "Ha ocurrido un error");
    }
  };
};
// Función para crear un videoGame
export const postVideogame = async (payload) => {
  try {
    const response = await axios.post(`${VIDEOGAME_API_URL}`, payload);
    window.alert("VideoGame Creado");
    return response.data;
  } catch (error) {
    window.alert(error.response.data.error || "Error posting videogame");
    throw error;
  }
};

// Función para traer todos los Platforms
export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}platforms`);
      const platforms = data.data;
      dispatch({ type: GET_PLATFORMS, payload: platforms });
    } catch (error) {
      window.alert(error.response || "Ha ocurrido un error");
    }
  };
};

// Función para traer todos los Genres
export const getGenre = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}genres`);
      const genres = data.data;
      dispatch({ type: GET_GENRES, payload: genres });
    } catch (error) {

      window.alert(error.genres || "Ha ocurrido un error");
    }
  };
};

export const filterVideogames = (filters) => {
  return (dispatch, store) => {
    try {
      const state = store()
      const fullVideogames = state.videoGameBK
      const filtersVideogames = fullVideogames.filter((vg) => {
        let valid = true
        if (filters?.platform !== 'ALL') valid = valid && vg.platform.includes(filters?.platform)
        if (filters?.genre !== 'ALL') valid = valid && vg.genre.includes(filters?.genre)
        if (filters?.created !== 'ALL') {
          const checkCreated = filters?.created === 'true' ? vg.created : !vg.created
          valid = valid && checkCreated
        }
        return valid
      })
      return dispatch(actionObject(FILTER_VIDEOGAMES, filtersVideogames))
    } catch (error) {
      window.alert(error?.data || "Ha ocurrido un error");
    }
  }
}


// Función para ordenar por rating
export const order = (order) => {
  return (dispatch) => {
    dispatch({
      type: ORDER,
      payload: order
    }
    )
  }
}