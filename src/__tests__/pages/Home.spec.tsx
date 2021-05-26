/**
 * IMPORTS
 */
import AxiosMock from 'axios-mock-adapter';
import { waitFor, render, fireEvent } from '@testing-library/react';
import { api } from '../../services/api';
import Home from '../../pages/Home';
import { useCart } from '../../hooks/useCart';

// mock use cart hook
jest.mock('../../hooks/useCart');

/**
 * CODE
 */
describe('Home Page', () => {
  /**
   * Test data
   */
  const apiMock = new AxiosMock(api);
  const mockedAddProduct = jest.fn();
  const mockedUseCartHook = useCart as jest.Mock;

  /**
   * Test initializers.
   */
  beforeAll(() => {
    apiMock.onGet('products').reply(200, [
      {
        id: 1,
        idCategory: 2,
        title: 'Bombom Com Pedaços De Cranberry Flormel',
        price: 86.06,
        image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
      },
      {
        id: 2,
        idCategory: 1,
        title: 'Água Mineral Sem Gás Crystal PET 500ML',
        price: 6,
        image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
      },
      {
        id: 3,
        idCategory: 1,
        name: 'Suco Integral Laranja Natural One Ambiente Garrafa 1,5l',
        price: 12.99,
        image: 'https://static.clubeextra.com.br/img/uploads/1/614/665614.png',
      },
    ]);

    apiMock.onGet('categories').reply(200, [
      {
        id: 1,
        name: 'Bebidas',
      },
      {
        id: 2,
        name: 'Doces',
      },
      {
        id: 3,
        name: 'Salgados',
      },
    ]);
  });

  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          amount: 2,
          id: 1,
          idCategory: 2,
          title: 'Bombom Com Pedaços De Cranberry Flormel',
          price: 86.06,
          image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
        },
        {
          amount: 1,
          id: 2,
          idCategory: 1,
          title: 'Água Mineral Sem Gás Crystal PET 500ML',
          price: 6,
          image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
        },
      ],
      addProduct: mockedAddProduct,
    });
  });

  it('should be able to render each product quantity added to cart', async () => {
    // render home component
    const { getAllByTestId } = render(<Home />);

    // try get product quantity
    await waitFor(() => getAllByTestId('cart-product-quantity'), {
      timeout: 200,
    });

    // get cart products quantity
    const [
      firstProductCartQuantity,
      secondProductCartQuantity,
      thirdProductCartQuantity,
    ] = getAllByTestId('cart-product-quantity');

    // products quantity rendered?
    expect(firstProductCartQuantity).toHaveTextContent('2');
    expect(secondProductCartQuantity).toHaveTextContent('1');
    expect(thirdProductCartQuantity).toHaveTextContent('0');
  });

  it('should be able to add a product to cart', async () => {
    // render home component
    const { getAllByTestId, rerender } = render(<Home />);

    // try get add product button
    await waitFor(() => getAllByTestId('add-product-button'), {
      timeout: 200,
    });

    // get add product button
    const [addFirstProduct] = getAllByTestId('add-product-button');

    // add product to cart
    fireEvent.click(addFirstProduct);

    // add product function called?
    expect(mockedAddProduct).toHaveBeenCalledWith(1);

    // mock cart return
    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 3,
          id: 1,
          idCategory: 2,
          title: 'Bombom Com Pedaços De Cranberry Flormel',
          price: 86.06,
          image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
        },
      ],
    });

    // rerender home page
    rerender(<Home />);

    // get product cart quantity
    const [firstProductCartQuantity] = getAllByTestId('cart-product-quantity');

    // product quantity increased?
    expect(firstProductCartQuantity).toHaveTextContent('3');
  });
});
