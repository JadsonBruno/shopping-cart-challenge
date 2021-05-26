/**
 * IMPORTS
 */
import {
  createContext, useContext, useState,
} from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

/**
 * TYPES
 */
import {
  CartContextData,
  CartProviderProps,
  UpdateProductAmount,
} from './useCart.d';
import { Product } from '../types';

/**
 * CODE
 */
// create cart context
const CartContext = createContext<CartContextData>({} as CartContextData);

/**
 * I return the Cart context provider.
 *
 * :prop children: react children
 *
 * :returns: cart context provider
 */
export function CartProvider({ children }: CartProviderProps): JSX.Element {
  // initialize cart as empty
  const [cart, setCart] = useState<Product[]>([]);

  /**
   * I add a product to the cart.
   *
   * :param productId: product ID to be added to cart
   *
   * :returns: promise with nothing
   */
  async function addProduct(productId: number): Promise<void> {
    try {
      // check whether product already at cart
      const selectedProduct = cart.find(
        (product) => product.id === productId,
      );

      // product already at cart: update product amount and finish
      if (selectedProduct !== undefined) {
        // count new product amount
        const total = selectedProduct.amount + 1;

        // create new cart with updated product amount
        const newCart = cart.map((item) => (item.id === productId
          ? {
            ...item,
            amount: total,
          }
          : item));

        // update cart
        setCart(newCart);

        // finish
        return;
      }

      // product not at cart: get product information
      const { data } = await api.get<Product>(`products/${productId}`);

      // add product to cart
      setCart((oldCart) => {
        const newCart = [...oldCart, { ...data, amount: 1 }];

        return newCart;
      });
    } catch {
      toast.error('Erro na adição do produto');
    }
  }

  /**
   * I remove a product from the cart.
   *
   * :param productId: product ID to be removed from cart
   *
   * :returns: promise with nothing
   */
  function removeProduct(productId: number): void {
    try {
      // product not in cart: throw error
      if (cart.findIndex((product) => product.id === productId) === -1) {
        throw new Error();
      }

      // product at cart: remove it and update cart
      setCart((prevState) => {
        const newCart = prevState.filter(
          (product) => product.id !== productId,
        );

        return newCart;
      });
    } catch {
      toast.error('Erro na remoção do produto');
    }
  }

  /**
   * I update the amount of product on cart.
   *
   * :prop productId: product ID to be updated
   * :prop amount: new amount value
   *
   * :returns: promise with nothing
   */
  function updateProductAmount({
    productId,
    amount,
  }: UpdateProductAmount): void {
    // invalid product amount: remove it
    if (amount <= 0) {
      return removeProduct(productId);
    }

    // valid product amount: update product amount and create cart with it
    const newCart = cart.map((product) => (product.id === productId
      ? { ...product, amount }
      : { ...product }));

    // update cart
    return setCart(newCart);
  }

  /**
   * I remove all products from cart.
   *
   * :returns: nothing
   */
  function clearCart(): void {
    setCart([]);
  }

  // return provider with children
  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * I return the useCart context.
 *
 * :returns: use cart context
 */
export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
