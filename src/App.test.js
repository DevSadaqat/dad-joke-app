import { render, screen } from '@testing-library/react';
import App from './App';
import SearchJoke from './components/SearchJoke';
import SearchResults from './components/SearchResults';

test('renders h2 element website heading', () => {
  render(<App />);
  const element = screen.getByText('Dad Jokes');
  expect(element).toBeInTheDocument();
});

test('renders button element', () => {
  render(<App />);
  const el = screen.getByText('Get A Joke!');
  expect(el).toBeInTheDocument();
});
