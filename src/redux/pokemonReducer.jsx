const initialState = {
  fetching: false,
  fulfilled: false,
  error: null,
  pokemons: {},
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POKEMON_PENDING":
      return { ...state, fetching: true };
    case "FETCH_POKEMON_REJECTED":
      return { ...state, fetching: false, error: action.payload };
    case "FETCH_POKEMON_FULFILLED":
      return {
        ...state,
        fetching: false,
        pokemons: action.payload.data,
      };
    case "CLEAR_POKEMON":
      return { ...state, pokemons: [] };
    default:
      return { ...state };
  }
};

export default pokemonReducer;
