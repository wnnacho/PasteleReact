import React from 'react';
import { render } from '@testing-library/react';
import Productos from './Productos';
import { MemoryRouter } from 'react-router-dom';

describe('Productos page', () => {
  it('renders products heading and carrito button', () => {
    const { container } = render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(text).toContain('Nuestros Productos');
    expect(text).toContain('Ver Carrito');
  });
});
