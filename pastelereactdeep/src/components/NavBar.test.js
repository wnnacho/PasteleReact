import React from 'react';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  it('debe existir el componente NavBar', () => {
    expect(NavBar).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof NavBar).toBe('function');
  });

  it('debe usar hooks de React', () => {
    // Verificamos que es un componente funcional con hooks
    expect(NavBar.toString()).toContain('useState');
    expect(NavBar.toString()).toContain('useEffect');
  });
});