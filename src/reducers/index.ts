// src/reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer, { PokemonState } from './pokemonSlice';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  // Добавьте другие редьюсеры здесь
});

export default rootReducer;
export type RootState = {
  pokemon: PokemonState;
};
