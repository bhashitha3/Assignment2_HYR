import axios from 'axios';

export const FETCH_PIKACHUS_SUCCESS = 'FETCH_PIKACHUS_SUCCESS';
export const NEXT_PIKACHUS = 'NEXT_PIKACHUS';
export const PREV_PIKACHUS = 'PREV_PIKACHUS';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon';

const fetchPikachusSuccess = pikachus => ({
  type: FETCH_PIKACHUS_SUCCESS,
  payload: pikachus,
});

export const fetchPikachus = () => {
  return async (dispatch, getState) => {
    const { offset } = getState();
    try {
      const response = await axios.get(`${apiUrl}?limit=&offset=${offset}`);
      const pikachus = await Promise.all(
        response.data.results.map(async pokemon => {
          const pokemonResponse = await axios.get(pokemon.url);
          return {
            id: pokemonResponse.data.id,
            name: pokemonResponse.data.name,
            image: pokemonResponse.data.sprites.front_default,
          };
        })
      );
      dispatch(fetchPikachusSuccess(pikachus));
    } catch (error) {
      console.error('Error fetching pikachus:', error);
    }
  };
};

export const nextPikachus = () => ({
  type: NEXT_PIKACHUS,
});

export const prevPikachus = () => ({
  type: PREV_PIKACHUS,
});
