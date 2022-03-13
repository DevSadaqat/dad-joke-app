import { render, screen } from '@testing-library/react';
import App from './App';

test('renders h2 element website heading', () => {
  render(<App />);
  const element = screen.getByText('Dad Jokes');
  expect(element).toBeInTheDocument();
});
