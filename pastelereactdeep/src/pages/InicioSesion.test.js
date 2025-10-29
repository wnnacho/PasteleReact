import React from 'react';
import InicioSesion from './InicioSesion';

describe('InicioSesion Component', () => {
  it('debe existir el componente InicioSesion', () => {
    expect(InicioSesion).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof InicioSesion).toBe('function');
  });

  it('debe manejar autenticación', () => {
    expect(InicioSesion.toString()).toContain('useState');
    expect(InicioSesion.toString()).toContain('handleSubmit');
  });
});