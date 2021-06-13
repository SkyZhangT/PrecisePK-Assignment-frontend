import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import pokemonReducer from "./pokemonReducer";
import trainerReducer from "./trainerReducer";
import themeReducer from "./themeReducer";

const middleware = [promise, thunk, logger];

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    trainer: trainerReducer,
    theme: themeReducer,
  },
  middleware: middleware,
});
