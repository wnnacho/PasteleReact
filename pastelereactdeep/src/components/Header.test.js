import React from 'react';
import Header from './Header';

describe('Header Component', () => {
  it('debe existir el componente Header', () => {
    expect(Header).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof Header).toBe('function');
  });

  it('debe exportarse por defecto', () => {
    // Verificamos que es una función (componente de React)
    expect(typeof Header).toBe('function');
  });
});