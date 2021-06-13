const initialState = {
  fetching: false,
  fulfilled: false,
  error: null,
  trainers: [],
  query: "",
  display: [],
};

const trainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TRAINER_PENDING":
    case "ADD_TRAINER_PENDING":
    case "DELETE_TRAINER_PENDING":
    case "UPDATE_POKEMON_PENDING":
      return { ...state, fetching: true };
    case "FETCH_TRAINER_REJECTED":
    case "ADD_TRAINER_REJECTED":
    case "DELETE_TRAINER_REJECTED":
    case "UPDATE_POKEMON_REJECTED":
      return { ...state, fetching: false, error: action.payload };
    case "FETCH_TRAINER_FULFILLED":
      return {
        ...state,
        fetching: false,
        trainers: action.payload.data,
        display: action.payload.data,
      };
    case "ADD_TRAINER_FULFILLED":
      return {
        ...state,
        fetching: false,
        trainers: state.trainers.concat(action.payload.data),
        display: state.display.concat(action.payload.data),
      };
    case "DELETE_TRAINER_FULFILLED":
      return {
        ...state,
        fetching: false,
        trainers: state.trainers.filter((trainer) => {
          return trainer._id !== action.payload.data._id;
        }),
        display: state.display.filter((trainer) => {
          return trainer._id !== action.payload.data._id;
        }),
      };
    case "UPDATE_POKEMON_FULFILLED":
      var new_trainers = [];
      for (var i in state.trainers) {
        if (state.trainers[i]._id === action.payload.data._id) {
          new_trainers.push(action.payload.data);
        } else {
          new_trainers.push(state.trainers[i]);
        }
      }
      var new_display = [];
      for (var i in state.display) {
        if (state.display[i]._id === action.payload.data._id) {
          new_display.push(action.payload.data);
        } else {
          new_display.push(state.display[i]);
        }
      }

      return {
        ...state,
        fetching: false,
        trainers: new_trainers,
        display: new_display,
      };
    case "SEARCH_TRAINER":
      const keyword = action.payload;
      var results = [];
      for (var i in state.trainers) {
        if (
          state.trainers[i].name.toLowerCase().includes(keyword.toLowerCase())
        ) {
          results = results.concat(state.trainers[i]);
          continue;
        }
        for (var j in state.trainers[i].pokemon_owned) {
          if (
            state.trainers[i].pokemon_owned[j].name
              .toLowerCase()
              .includes(keyword.toLowerCase())
          ) {
            results = results.concat(state.trainers[i]);
            continue;
          }
        }
      }
      return {
        ...state,
        display: results,
      };
    default:
      return { ...state };
  }
};

export default trainerReducer;
