import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from './types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    fetchPokemonList: builder.query<string[], number>({
      query: page => `pokemon?offset=${page * 20}&limit=20`,
      transformResponse: (response: { results: { name: string }[] }) =>
        response.results.map(pokemon => pokemon.name),
    }),
    fetchPokemonDetails: builder.query<Pokemon, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
});

export const { useFetchPokemonListQuery, useFetchPokemonDetailsQuery } =
  pokemonApi;
