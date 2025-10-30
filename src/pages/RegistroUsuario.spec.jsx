import React from 'react';
import { render } from '@testing-library/react';
import RegistroUsuario from './RegistroUsuario';
import { MemoryRouter } from 'react-router-dom';

describe('RegistroUsuario page', () => {
  it('renders create account title and submit button', () => {
    const { container } = render(
      <MemoryRouter>
        <RegistroUsuario />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(text).toContain('Crear Cuenta');
  });
});
