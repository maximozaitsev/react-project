import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/Search/Search';

test('saves the entered value to local storage on search', () => {
  render(<Search onSearch={() => {}} />);

  const inputElement = screen.getByPlaceholderText(/Search Pokemon/i);
  const searchButton = screen.getByText(/Search/i);

  fireEvent.change(inputElement, { target: { value: 'pikachu' } });
  fireEvent.click(searchButton);

  expect(localStorage.getItem('searchTerm')).toBe('pikachu');
});

test('retrieves the value from local storage upon mounting', () => {
  localStorage.setItem('searchTerm', 'bulbasaur');

  render(<Search onSearch={() => {}} />);

  const inputElement = screen.getByPlaceholderText(/Search Pokemon/i);
  expect(inputElement).toHaveValue('bulbasaur');
});
