import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './reducers/pokemonSlice';
import selectedPokemonReducer from './reducers/selectedPokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    selectedPokemon: selectedPokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
