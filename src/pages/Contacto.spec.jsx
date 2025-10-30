import React from 'react';
import { render } from '@testing-library/react';
import Contacto from './Contacto';
import { MemoryRouter } from 'react-router-dom';

describe('Contacto page', () => {
  it('renders contact title and email', () => {
    const { container } = render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(text).toContain('Contáctanos');
    expect(text).toContain('info@pasteleriamilsabores.cl');
  });
});
