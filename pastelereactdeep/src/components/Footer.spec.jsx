import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer component', () => {
  it('renders contact information including email', () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('info@pasteleriamilsabores.cl');
  });
});
