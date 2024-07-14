import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../components/Pagination';

test('updates URL query parameter when page changes', () => {
  render(
    <MemoryRouter initialEntries={['/main?page=1']}>
      <Pagination currentPage={1} totalPages={5} />
    </MemoryRouter>
  );

  const nextButton = screen.getByText(/Next/i);
  fireEvent.click(nextButton);

  expect(window.location.search).toBe('?page=2');
});
