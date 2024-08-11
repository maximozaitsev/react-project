// src/__tests__/PokemonList.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useFetchPokemonListQuery } from '../services/pokemonApi';
import PokemonList from '../components/PokemonList/PokemonList';
import { RootState } from '../store/store';
import useTheme from '../hooks/useTheme';

jest.mock('../services/pokemonApi');
jest.mock('../hooks/useTheme');

const mockStore = configureStore<Partial<RootState>>([]);

describe('PokemonList Component', () => {
  const mockDispatch = jest.fn();
  const store = mockStore({
    selectedPokemon: [],
  } as Partial<RootState>);

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch = mockDispatch;
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  const renderComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <PokemonList
          searchTerm=""
          currentPage={1}
          onPokemonClick={jest.fn()}
          {...props}
        />
      </Provider>
    );

  test('renders correctly', () => {
    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      data: ['pikachu', 'bulbasaur'],
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  test('filters the list based on search term', () => {
    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      data: ['pikachu', 'bulbasaur'],
      isLoading: false,
      error: null,
    });

    renderComponent({ searchTerm: 'pika' });

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  test('displays loading message', () => {
    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message', () => {
    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: true,
    });

    renderComponent();

    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  test('toggles pokemon selection', () => {
    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      data: ['pikachu', 'bulbasaur'],
      isLoading: false,
      error: null,
    });

    renderComponent();

    const pikachuCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(pikachuCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'selectedPokemon/toggleSelectPokemon',
      payload: 'pikachu',
    });
  });

  test('applies the correct theme', () => {
    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      data: ['pikachu', 'bulbasaur'],
      isLoading: false,
      error: null,
    });

    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });

    renderComponent();

    expect(screen.getByText('pikachu').closest('.pokemon-list')).toHaveClass(
      'dark'
    );
  });
});
