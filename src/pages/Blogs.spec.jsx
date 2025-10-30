import React from 'react';
import { render, screen } from '@testing-library/react';
import Blogs from './Blogs';
import { MemoryRouter } from 'react-router-dom';

// Mock image imports
jest.mock('../assets/tccfrutas.jpg', () => 'tccfrutas.jpg');
jest.mock('../assets/tiramisu.jpg', () => 'tiramisu.jpg');
jest.mock('../assets/cheesecake.jpg', () => 'cheesecake.jpg');

describe('Blogs page', () => {
  it('renders blog title and description', () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Blog de Repostería')).toBeInTheDocument();
    expect(screen.getByText(/Descubre tips, recetas y técnicas/i)).toBeInTheDocument();
  });

  it('renders all three blog cards', () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );
    
    expect(screen.getByText('5 Técnicas de Decoración para Principiantes')).toBeInTheDocument();
    expect(screen.getByText('Recetas Chilenas que no Pueden Faltar')).toBeInTheDocument();
    expect(screen.getByText('Postres Sin Azúcar: Mitos y Realidades')).toBeInTheDocument();
  });

  it('renders images with correct alt text', () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );
    
    expect(screen.getByAltText('Técnicas')).toBeInTheDocument();
    expect(screen.getByAltText('Recetas')).toBeInTheDocument();
    expect(screen.getByAltText('Saludables')).toBeInTheDocument();
  });

  it('renders links to blog details', () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );
    
    const links = screen.getAllByText('Leer más →');
    expect(links).toHaveLength(3);
  });
});
