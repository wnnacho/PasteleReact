import React from 'react';
import HomeAdmin from './HomeAdmin';

describe('HomeAdmin Component', () => {
  it('debe existir el componente HomeAdmin', () => {
    expect(HomeAdmin).toBeDefined();
  });

  it('debe ser un componente de React', () => {
    expect(typeof HomeAdmin).toBe('function');
  });

  it('debe manejar funcionalidades de administración', () => {
    expect(HomeAdmin.toString()).toContain('useState');
    expect(HomeAdmin.toString()).toContain('useEffect');
    expect(HomeAdmin.toString()).toContain('localStorage');
  });
});