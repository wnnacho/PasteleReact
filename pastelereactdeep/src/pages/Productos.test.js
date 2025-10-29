import React from 'react';
import Productos from './Productos';

describe('Productos Component', () => {
  it('debe existir el componente Productos', () => {
    expect(Productos).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof Productos).toBe('function');
  });

  it('debe manejar estado con hooks', () => {
    expect(Productos.toString()).toContain('useState');
  });
});