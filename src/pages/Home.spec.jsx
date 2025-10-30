import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home page', () => {
  it('renders welcome title and product link', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('Bienvenido a Pastelería Mil Sabores');
    expect(container.textContent).toContain('Ver Productos');
  });
});
