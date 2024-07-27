// src/__tests__/PokemonDetails.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFetchPokemonDetailsQuery } from '../services/pokemonApi';
import PokemonDetails from '../components/PokemonDetails';

jest.mock('../../services/pokemonApi');

describe('PokemonDetails Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(<PokemonDetails name="pikachu" onClose={mockOnClose} {...props} />);

  test('renders loading message', () => {
    (useFetchPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message', () => {
    (useFetchPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    renderComponent();

    expect(screen.getByText('Pokemon details not found')).toBeInTheDocument();
  });

  test('renders pokemon details', () => {
    (useFetchPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'pikachu',
        sprites: {
          front_default: 'pikachu.png',
        },
        height: 4,
        weight: 60,
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText('Height: 4')).toBeInTheDocument();
    expect(screen.getByText('Weight: 60')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    (useFetchPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'pikachu',
        sprites: {
          front_default: 'pikachu.png',
        },
        height: 4,
        weight: 60,
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    fireEvent.click(screen.getByText('Close'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
