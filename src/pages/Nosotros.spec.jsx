import React from 'react';
import { render } from '@testing-library/react';
import Nosotros from './Nosotros';
import { MemoryRouter } from 'react-router-dom';

describe('Nosotros page', () => {
  it('renders about title and history section', () => {
    const { container } = render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(text).toContain('Sobre Nosotros');
    expect(text).toContain('Nuestra Historia');
  });
});
