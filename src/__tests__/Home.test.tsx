import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home';

test('renders My Pokemon App title', () => {
  render(<Home />);
  const titleElement = screen.getByText(/My Pokemon App/i);
  expect(titleElement).toBeInTheDocument();
});
