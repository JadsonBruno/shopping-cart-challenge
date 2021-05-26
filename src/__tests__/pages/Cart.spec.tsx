/**
 * IMPORTS
 */
import { render, fireEvent, screen } from '@testing-library/react';
import { useCart } from '../../hooks/useCart';
import Cart from '../../pages/Cart';

// mock use cart hook
jest.mock('../../hooks/useCart');

/**
 * CODE
 */
describe('Cart Page', () => {
  /**
   * Test data
   */
  const mockedRemoveProduct = jest.fn();
  const mockedUpdateProductAmount = jest.fn();
  const mockedUseCartHook = useCart as jest.Mock;
  const productsMocked = [
    {
      id: 1,
      idCategory: 2,
      title: 'Bombom Com Pedaços De Cranberry Flormel',
      price: 86.06,
      image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
      amount: 1,
    },
    {
      id: 2,
      idCategory: 1,
      title: 'Água Mineral Sem Gás Crystal PET 500ML',
      price: 6,
      image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
      amount: 2,
    },
  ];

  /**
   * Test initializers.
   */
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: productsMocked,
      removeProduct: mockedRemoveProduct,
      updateProductAmount: mockedUpdateProductAmount,
    });
  });

  it('should be able to increase/decrease a product amount', () => {
    // render cart component
    const { rerender } = render(<Cart />);

    // get increment button for first product
    const [incrementFirstProduct] = screen.getAllByTestId('increment-product');

    // get decrement button for second product
    const [, decrementSecondProduct] = screen.getAllByTestId('decrement-product');

    // get products amount
    const [firstProductAmount, secondProductAmount] = screen.getAllByTestId(
      'product-amount',
    );

    // first product has 1 item?
    expect(firstProductAmount).toHaveDisplayValue('1');

    // second product has 2 itens?
    expect(secondProductAmount).toHaveDisplayValue('2');

    // increment first product amount
    fireEvent.click(incrementFirstProduct);

    // decrement second product amount
    fireEvent.click(decrementSecondProduct);

    // first product amount updated?
    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 2,
      productId: 1,
    });

    // second product amount updated?
    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 1,
      productId: 2,
    });

    // mock use cart hook return
    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          id: 1,
          idCategory: 2,
          title: 'Bombom Com Pedaços De Cranberry Flormel',
          price: 86.06,
          image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
          amount: 2,
        },
        {
          id: 2,
          idCategory: 1,
          title: 'Água Mineral Sem Gás Crystal PET 500ML',
          price: 6,
          image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
          amount: 1,
        },
      ],
    });

    // rerender cart component
    rerender(<Cart />);

    // first product amount increased?
    expect(firstProductAmount).toHaveDisplayValue('2');

    // second product amount decreased?
    expect(secondProductAmount).toHaveDisplayValue('1');
  });

  it('should be able to remove a product when reset amount', () => {
    // render cart component
    render(<Cart />);

    // get decrement button for first product
    const [decrementFirstProduct] = screen.getAllByTestId('decrement-product');

    // get product amount
    const [firstProductAmount] = screen.getAllByTestId(
      'product-amount',
    );

    // first product has 1 item?
    expect(firstProductAmount).toHaveDisplayValue('1');

    // decrement product amount
    fireEvent.click(decrementFirstProduct);

    // product amount updated?
    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 0,
      productId: 1,
    });
  });
});
