import React from 'react';
import { createRoot } from 'react-dom/client';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Footer from './Footer';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it('renders without crashing using createRoot and act', () => {
  createRoot(container).render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
});

it('displays the correct text using render', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
    container 
  );
  const textElement = screen.getByText('Generamos la ventaja competitiva que necesitas.');
  expect(textElement).toBeTruthy();
});