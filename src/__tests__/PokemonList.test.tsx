import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import PokemonList from '../components/PokemonList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders pokemon list', async () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    },
  });

  render(
    <PokemonList searchTerm="" currentPage={1} onPokemonClick={() => {}} />
  );

  await waitFor(() => {
    const pokemonElement = screen.getByText(/pikachu/i);
    expect(pokemonElement).toBeInTheDocument();
  });
});
