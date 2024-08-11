import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemonApi';
import selectedPokemonReducer from './reducers/selectedPokemonSlice';

const store = configureStore({
  reducer: {
    selectedPokemon: selectedPokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
