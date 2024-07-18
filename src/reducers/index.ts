// src/reducers/index.ts
import { combineReducers } from 'redux';
import pokemonReducer from './pokemonSlice';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  // Добавьте другие редьюсеры здесь
});

export default rootReducer;
