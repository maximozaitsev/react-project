// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../components//Home';

// Mocking components
jest.mock(
  '../Search',
  () =>
    ({ onSearch }: { onSearch: (term: string) => void }) => (
      <input
        type="text"
        placeholder="Search Pokemon"
        onChange={e => onSearch(e.target.value)}
      />
    )
);

jest.mock(
  '../PokemonList',
  () =>
    ({
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
    )
);

jest.mock(
  '../components/Pagination',
  () =>
    ({ currentPage }: { currentPage: number }) => <div>Page: {currentPage}</div>
);

jest.mock(
  '../components/PokemonDetails',
  () =>
    ({ name, onClose }: { name: string; onClose: () => void }) => (
      <div data-testid="pokemon-details">
        <h2>{name}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    )
);

describe('Home Component', () => {
  test('renders Home component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('My Pokemon App')).toBeInTheDocument();
  });

  test('updates search term', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
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

  test('selects a pokemon and shows details', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Pikachu'));

    expect(screen.getByTestId('pokemon-details')).toBeInTheDocument();
  });

  test('closes pokemon details', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // First select a pokemon to show details
    fireEvent.click(screen.getByText('Pikachu'));

    // Ensure that the details are shown
    expect(screen.getByTestId('pokemon-details')).toBeInTheDocument();

    // Now close the details
    fireEvent.click(screen.getByText('Close'));

    // Wait for the details to be closed
    await waitFor(() =>
      expect(screen.queryByTestId('pokemon-details')).not.toBeInTheDocument()
    );
  });
});
