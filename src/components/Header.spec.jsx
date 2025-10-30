import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders the bakery title', () => {
    const { container } = render(<Header />);
    expect(container.textContent).toContain('Pastelería Mil Sabores');
  });
});
