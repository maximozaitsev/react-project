// src/__tests__/PokemonDetails.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PokemonDetails from '../components/PokemonDetails';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPokemonData = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
};

test('renders pokemon details', async () => {
  mockedAxios.get.mockResolvedValue({ data: mockPokemonData });

  render(<PokemonDetails name="pikachu" onClose={() => {}} />);

  await waitFor(() => {
    const nameElement = screen.getByText(/pikachu/i);
    const heightElement = screen.getByText(/Height: 4/i);
    const weightElement = screen.getByText(/Weight: 60/i);
    const spriteElement = screen.getByAltText(/pikachu/i);

    expect(nameElement).toBeInTheDocument();
    expect(heightElement).toBeInTheDocument();
    expect(weightElement).toBeInTheDocument();
    expect(spriteElement).toHaveAttribute(
      'src',
      mockPokemonData.sprites.front_default
    );
  });
});
