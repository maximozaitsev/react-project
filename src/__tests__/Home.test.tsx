import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';

test('renders My Pokemon App title', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/My Pokemon App/i);
  expect(titleElement).toBeInTheDocument();
});
