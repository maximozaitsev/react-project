import { createSlice } from '@reduxjs/toolkit';

const selectedPokemonSlice = createSlice({
  name: 'selectedPokemon',
  initialState: [] as string[],
  reducers: {
    toggleSelectPokemon: (state, action) => {
      const index = state.indexOf(action.payload);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
    },
    clearSelectedPokemon: () => {
      return [];
    },
  },
});

export const { toggleSelectPokemon, clearSelectedPokemon } =
  selectedPokemonSlice.actions;
export default selectedPokemonSlice.reducer;
