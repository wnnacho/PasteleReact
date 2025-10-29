import React from 'react';
import Contacto from './Contacto';

describe('Contacto Component', () => {
  it('debe existir el componente Contacto', () => {
    expect(Contacto).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof Contacto).toBe('function');
  });

  it('debe manejar formularios con estado', () => {
    expect(Contacto.toString()).toContain('useState');
    expect(Contacto.toString()).toContain('formData');
  });
});