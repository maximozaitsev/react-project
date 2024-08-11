import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('updates URL query parameter when page changes', async () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  render(
    <MemoryRouter initialEntries={['/main?page=1']}>
      <Routes>
        <Route
          path="/main"
          element={<Pagination currentPage={1} totalPages={5} />}
        />
      </Routes>
    </MemoryRouter>
  );

  const nextButton = screen.getByText(/Next/i);
  fireEvent.click(nextButton);

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith({ search: 'page=2' });
  });
});
