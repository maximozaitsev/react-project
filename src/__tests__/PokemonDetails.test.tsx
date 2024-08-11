// src/__tests__/PokemonDetails.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import { useFetchPokemonDetailsQuery } from '../services/pokemonApi';

jest.mock('../services/pokemonApi', () => ({
  useFetchPokemonDetailsQuery: jest.fn(),
}));

describe('PokemonDetails Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading message', () => {
    (useFetchPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<PokemonDetails name="pikachu" onClose={mockOnClose} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message', () => {
    (useFetchPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<PokemonDetails name="pikachu" onClose={mockOnClose} />);

    expect(screen.getByText('Pokemon details not found')).toBeInTheDocument();
  });

  test('displays pokemon details', () => {
    (useFetchPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'pikachu',
        sprites: { front_default: 'pikachu.png' },
        height: 4,
        weight: 60,
      },
      isLoading: false,
      error: null,
    });

    render(<PokemonDetails name="pikachu" onClose={mockOnClose} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText('Height: 4')).toBeInTheDocument();
    expect(screen.getByText('Weight: 60')).toBeInTheDocument();
  });
});
