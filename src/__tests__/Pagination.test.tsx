import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../components/Pagination';

test('updates URL query parameter when page changes', async () => {
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
    expect(window.location.search).toBe('?page=2');
  });
});
