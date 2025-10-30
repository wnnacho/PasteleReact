import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app with header', () => {
  render(<App />);
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toHaveTextContent(/Pastelería Mil Sabores/i);
});

test('renders the home page by default', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Bienvenido a Pastelería Mil Sabores/i);
  expect(welcomeElement).toBeInTheDocument();
});
