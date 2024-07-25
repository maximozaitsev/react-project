import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface PokemonState {
  list: string[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
};

interface PokemonResponse {
  results: { name: string }[];
}

// Явно указываем типы для createAsyncThunk
export const fetchPokemon = createAsyncThunk<
  string[],
  number,
  { rejectValue: string }
>('pokemon/fetchPokemon', async (currentPage: number, { rejectWithValue }) => {
  try {
    const response = await axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon',
      {
        params: {
          offset: (currentPage - 1) * 20,
          limit: 20,
        },
      }
    );
    return response.data.results.map(pokemon => pokemon.name);
  } catch (error) {
    return rejectWithValue('Failed to fetch Pokemon');
  }
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemon.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemon.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pokemonSlice.reducer;
