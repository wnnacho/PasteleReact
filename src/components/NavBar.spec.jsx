import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar component', () => {
  it('renders main navigation links', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <NavBar />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(text).toContain('Home');
    expect(text).toContain('Productos');
    expect(text).toContain('Blogs');
  });
});
