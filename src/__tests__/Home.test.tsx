// src/__tests__/Home.test.tsx
import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';

// Mocking components with correct paths
jest.mock('../components/Search/Search', () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (term: string) => void }) => (
    <input
      type="text"
      placeholder="Search Pokemon"
      onChange={e => onSearch(e.target.value)}
    />
  ),
}));

jest.mock('../components/PokemonList/PokemonList', () => ({
  __esModule: true,
  default: ({
    searchTerm,
    onPokemonClick,
  }: {
    searchTerm: string;
    onPokemonClick: (name: string) => void;
  }) => (
    <div data-testid="pokemon-list">
      {searchTerm && <p>Results for: {searchTerm}</p>}
      <button onClick={() => onPokemonClick('pikachu')}>Pikachu</button>
    </div>
  ),
}));

jest.mock('../components/Pagination/Pagination', () => ({
  __esModule: true,
  default: ({ currentPage }: { currentPage: number }) => (
    <div>Page: {currentPage}</div>
  ),
}));

jest.mock('../components/PokemonDetails', () => ({
  __esModule: true,
  default: ({ name, onClose }: { name: string; onClose: () => void }) => (
    <div data-testid="pokemon-details">
      <h2>{name}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('Home Component', () => {
  test('renders Home component', () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search Pokemon')).toBeInTheDocument();
    expect(screen.getByText('Page: 1')).toBeInTheDocument();
  });

  test('updates search term', () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Search Pokemon'), {
      target: { value: 'pikachu' },
    });

    expect(screen.getByText('Results for: pikachu')).toBeInTheDocument();
  });

  test('selects a pokemon and shows details', async () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Pikachu'));

    await waitFor(() =>
      expect(screen.getByTestId('pokemon-details')).toBeInTheDocument()
    );
  });

  test('closes pokemon details', async () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // First select a pokemon to show details
    fireEvent.click(screen.getByText('Pikachu'));

    // Ensure that the details are shown
    await waitFor(() =>
      expect(screen.getByTestId('pokemon-details')).toBeInTheDocument()
    );

    // Now close the details
    fireEvent.click(screen.getByText('Close'));

    // Wait for the details to be closed
    await waitFor(() =>
      expect(screen.queryByTestId('pokemon-details')).not.toBeInTheDocument()
    );
  });

  test('updates URL when selecting a pokemon', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Pikachu'));

    await waitFor(() => {
      expect(window.location.search).toBe('?page=1&details=pikachu');
    });
  });

  test('updates URL when closing pokemon details', async () => {
    render(
      <MemoryRouter
        initialEntries={['/?page=1&details=pikachu']}
        initialIndex={0}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // First ensure details are visible
    await waitFor(() =>
      expect(screen.getByTestId('pokemon-details')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(window.location.search).toBe('?page=1');
    });
  });
});
