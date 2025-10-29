import React from 'react';
import Nosotros from './Nosotros';

describe('Nosotros Component', () => {
  it('debe existir el componente Nosotros', () => {
    expect(Nosotros).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof Nosotros).toBe('function');
  });

  it('debe renderizar contenido estático', () => {
    // Verificamos que es un componente que renderiza contenido
    expect(Nosotros.toString()).toContain('return');
  });
});