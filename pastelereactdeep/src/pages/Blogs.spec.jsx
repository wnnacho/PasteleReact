import React from 'react';
import { render } from '@testing-library/react';
import Blogs from './Blogs';
import { MemoryRouter } from 'react-router-dom';

describe('Blogs page', () => {
  it('renders blog title and cards', () => {
    const { container } = render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(text).toContain('Blog de Repostería');
    expect(text).toContain('Leer más');
  });
});
