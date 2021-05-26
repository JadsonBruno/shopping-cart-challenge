/**
 * IMPORTS
 */
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import Header from '../../components/Header';

// mock router link
jest.mock('react-router-dom', () => ({
  Link: ({ children }: { children: ReactNode }) => children,
}));

// mock useCart hook return
jest.mock('../../hooks/useCart', () => ({
  useCart: () => ({
    cart: [
      {
        amount: 2,
        id: 1,
        image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
        price: 179.9,
        title: 'Bombom Com Pedaços De Cranberry Flormel',
      },
      {
        amount: 1,
        id: 2,
        image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
        price: 139.9,
        title: 'Água Mineral Sem Gás Crystal PET 500ML',
      },
    ],
  }),
}));

/**
 * CODE
 */
describe('Header Component', () => {
  it('should be able to render the amount of products added to cart', () => {
    // render header component
    render(<Header />);

    // get cart size counter
    const cartSizeCounter = screen.getByTestId('cart-size');

    // cart size is corret?
    expect(cartSizeCounter).toHaveTextContent('2 itens');
  });
});
