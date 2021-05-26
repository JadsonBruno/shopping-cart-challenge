/**
 * IMPORTS
 */
import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useCart, CartProvider } from '../../hooks/useCart';

// mock api
const apiMock = new AxiosMock(api);

// mock react toastify
jest.mock('react-toastify');

// mock toast error
const mockedToastError = toast.error as jest.Mock;

/**
 * CODE
 */
describe('useCart Hook', () => {
  /**
   * Test initializers.
   */
  beforeEach(() => {
    apiMock.reset();
  });

  /**
   * Test data
   */
  const PRODUCT_ID = 1;
  const SECOND_PRODUCT_ID = 3;
  const MOCKED_PRODUCT = {
    id: PRODUCT_ID,
    idCategory: 2,
    title: 'Bombom Com Pedaços De Cranberry Flormel',
    price: 86.06,
    image: 'https://static.clubeextra.com.br/img/uploads/1/247/5039247.png',
  };

  it('should be able to add a new product', async () => {
    // mock api return for product
    apiMock.onGet(`products/${PRODUCT_ID}`).reply(200, MOCKED_PRODUCT);

    // render use cart hook
    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    // add product to cart
    act(() => {
      result.current.addProduct(PRODUCT_ID);
    });

    // wait to component update
    await waitForNextUpdate({ timeout: 200 });

    // product added?
    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          ...MOCKED_PRODUCT,
          amount: 1,
        },
      ]),
    );
  });

  it('should not be able to add a product that does not exist', async () => {
    // mock api return for product
    apiMock.onGet(`products/${SECOND_PRODUCT_ID}`).reply(404);

    // render use cart hook
    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    // add product to cart
    act(() => {
      result.current.addProduct(SECOND_PRODUCT_ID);
    });

    // not added?
    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na adição do produto',
        );
      },
      { timeout: 200 },
    );
  });

  it('should be able to increase a product amount when adding a product that already exists on cart',
    async () => {
      // mock api return for product
      apiMock.onGet(`products/${PRODUCT_ID}`).reply(200, MOCKED_PRODUCT);

      // render use cart hook
      const { result, waitForNextUpdate } = renderHook(useCart, {
        wrapper: CartProvider,
      });

      // add product to cart
      act(() => {
        result.current.addProduct(PRODUCT_ID);
      });

      // wait to component update
      await waitForNextUpdate({ timeout: 200 });

      // product added?
      expect(result.current.cart).toEqual(
        expect.arrayContaining([
          {
            ...MOCKED_PRODUCT,
            amount: 1,
          },
        ]),
      );

      // add product to cart again
      act(() => {
        result.current.addProduct(PRODUCT_ID);
      });

      // amount increased?
      expect(result.current.cart).toEqual(
        expect.arrayContaining([
          {
            ...MOCKED_PRODUCT,
            amount: 2,
          },
        ]),
      );
    });

  it('should be able to remove a product', async () => {
    // mock api return for product
    apiMock.onGet(`products/${PRODUCT_ID}`).reply(200, MOCKED_PRODUCT);

    // render use cart hook
    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    // add product to cart
    act(() => {
      result.current.addProduct(PRODUCT_ID);
    });

    // wait to component update
    await waitForNextUpdate({ timeout: 200 });

    // product added?
    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          ...MOCKED_PRODUCT,
          amount: 1,
        },
      ]),
    );

    // remove product from cart
    act(() => {
      result.current.removeProduct(PRODUCT_ID);
    });

    // product removed?
    expect(result.current.cart).toEqual([]);
  });

  it('should not be able to remove a product that does not exist', () => {
    // render use cart hook
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    // remove product
    act(() => {
      result.current.removeProduct(SECOND_PRODUCT_ID);
    });

    // product not removed?
    expect(mockedToastError).toHaveBeenCalledWith('Erro na remoção do produto');
  });

  it('should be able to update a product amount', async () => {
    // mock api return for product
    apiMock.onGet(`products/${PRODUCT_ID}`).reply(200, MOCKED_PRODUCT);

    // render use cart hook
    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    // add product to cart
    act(() => {
      result.current.addProduct(PRODUCT_ID);
    });

    // wait to component update
    await waitForNextUpdate({ timeout: 200 });

    // update product amount
    act(() => {
      result.current.updateProductAmount({ amount: 2, productId: PRODUCT_ID });
    });

    // amount updated?
    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          ...MOCKED_PRODUCT,
          amount: 2,
        },
      ]),
    );
  });
});
