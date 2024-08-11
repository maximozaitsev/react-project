// src/__tests__/selectedPokemonSlice.test.ts
import selectedPokemonReducer, {
  toggleSelectPokemon,
  clearSelectedPokemon,
} from '../store/reducers/selectedPokemonSlice';

describe('selectedPokemonSlice', () => {
  test('should return the initial state', () => {
    const initialState: string[] = [];
    expect(selectedPokemonReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('should handle toggleSelectPokemon', () => {
    const initialState: string[] = [];
    const actual = selectedPokemonReducer(
      initialState,
      toggleSelectPokemon('pikachu')
    );
    expect(actual).toEqual(['pikachu']);

    const updatedState = selectedPokemonReducer(
      actual,
      toggleSelectPokemon('pikachu')
    );
    expect(updatedState).toEqual([]);
  });

  test('should handle clearSelectedPokemon', () => {
    const initialState: string[] = ['pikachu'];
    const actual = selectedPokemonReducer(initialState, clearSelectedPokemon());
    expect(actual).toEqual([]);
  });
});
