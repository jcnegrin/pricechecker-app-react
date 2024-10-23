import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import CategoryProducts from '../src/components/CategoryProducts/CategoryProducts';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock del modal y de la tarjeta
vi.mock('../ProductDetailModal/ProductDetailModal', () => ({
  __esModule: true,
  default: ({ product, closeModal }: any) => (
    <div>
      <p>{product.name}</p>
      <button onClick={closeModal}>Close</button>
    </div>
  ),
}));

vi.mock('../Card/Card', () => ({
  __esModule: true,
  default: ({ producto }: any) => <div>{producto.name}</div>,
}));

describe('CategoryProducts Component', () => {
  // Mock de fetch global para simular la API
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el mensaje de carga mientras se obtienen los productos', () => {
    render(
      <BrowserRouter>
        <CategoryProducts />
      </BrowserRouter>
    );
    expect(screen.getByText('Cargando productos...')).toBeInTheDocument();
  });

  it('muestra un mensaje de error si ocurre un error al obtener los productos', async () => {
    (globalThis.fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    render(
      <BrowserRouter>
        <CategoryProducts />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error al cargar productos: Error 500: Internal Server Error')).toBeInTheDocument();
    });
  });

  it('muestra los productos correctamente después de la carga', async () => {
    const mockProducts = {
      products: [
        { id: '1', name: 'Manzana', description: 'Una manzana deliciosa', imageUrl: 'apple.jpg', price: 1.99, shop: { id: '1', name: 'Supermercado' } },
        { id: '2', name: 'Banana', description: 'Una banana deliciosa', imageUrl: 'banana.jpg', price: 0.99, shop: { id: '1', name: 'Supermercado' } },
      ],
    };

    (globalThis.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockProducts),
    });

    render(
      <BrowserRouter>
        <CategoryProducts />
      </BrowserRouter>
    );

    // Esperamos que los productos aparezcan
    await waitFor(() => {
      expect(screen.getByText('Manzana')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });
  });

  it('abre y cierra el modal cuando se selecciona un producto', async () => {
    const mockProducts = {
      products: [
        { id: '1', name: 'Manzana', description: 'Una manzana deliciosa', imageUrl: 'apple.jpg', price: 1.99, shop: { id: '1', name: 'Supermercado' } },
      ],
    };

    (globalThis.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockProducts),
    });

    render(
      <BrowserRouter>
        <CategoryProducts />
      </BrowserRouter>
    );

    // Esperamos a que los productos se muestren
    await waitFor(() => {
      expect(screen.getByText('Manzana')).toBeInTheDocument();
    });

    // Simulamos clic para abrir el modal
    fireEvent.click(screen.getByText('Manzana'));

    // Verificamos que se abre el modal
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Simulamos clic para cerrar el modal
    fireEvent.click(screen.getByRole('button'));

    // Verificamos que se cierre el modal
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
  });

  it('deshabilita el scroll del fondo cuando la modal está abierta', async () => {
    const mockProducts = {
      products: [
        { id: '1', name: 'Manzana', description: 'Una manzana deliciosa', imageUrl: 'apple.jpg', price: 1.99, shop: { id: '1', name: 'Supermercado' } },
      ],
    };

    (globalThis.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockProducts),
    });

    render(
      <BrowserRouter>
        <CategoryProducts />
      </BrowserRouter>
    );

    // Verificamos que no haya overflow-hidden inicialmente
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);

    await waitFor(() => {
        expect(screen.getByText('Manzana')).toBeInTheDocument();
      });
    // Simulamos clic para abrir el modal
    fireEvent.click(screen.getByText('Manzana'));

    // Verificamos que se añada la clase overflow-hidden
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);

    // Simulamos clic para cerrar el modal
    fireEvent.click(screen.getByRole('button'));

    // Verificamos que se elimine la clase overflow-hidden
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });
});