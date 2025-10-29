import React from 'react';
import Home from './Home';

describe('Home Component', () => {
  it('debe existir el componente Home', () => {
    expect(Home).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof Home).toBe('function');
  });

  it('debe importar assets correctamente', () => {
    // Si el componente importa imágenes, esta prueba verifica que no hay errores de importación
    expect(() => Home({})).not.toThrow();
  });
});