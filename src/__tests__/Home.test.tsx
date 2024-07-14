// src/__tests__/Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('renders My Pokemon App title', () => {
  render(<Home />);
  const titleElement = screen.getByText(/My Pokemon App/i);
  expect(titleElement).toBeInTheDocument();
});
