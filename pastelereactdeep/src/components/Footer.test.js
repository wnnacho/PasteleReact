import React from 'react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('debe existir el componente Footer', () => {
    expect(Footer).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof Footer).toBe('function');
  });

  it('debe tener un nombre de componente', () => {
    expect(Footer.name).toBe('Footer');
  });
});