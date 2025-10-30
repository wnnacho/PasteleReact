import React from 'react';
import { render } from '@testing-library/react';
import InicioSesion from './InicioSesion';
import { MemoryRouter } from 'react-router-dom';

describe('InicioSesion page', () => {
  it('renders sign in title and button', () => {
    const { container } = render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(text).toContain('Iniciar Sesión');
  });
});
