/**
 * IMPORTS
 */
import { ReactNode } from 'react';
import { Product } from '../types';

/**
 * CODE
 */
interface CartProviderProps {
    children: ReactNode;
}

interface UpdateProductAmount {
    productId: number;
    amount: number;
}

interface CartContextData {
    cart: Product[];
    addProduct: (productId: number) => Promise<void>;
    removeProduct: (productId: number) => void;
    updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
    clearCart: () => void;
}

/**
 * EXPORTS
 */
export {
  CartContextData,
  CartProviderProps,
  UpdateProductAmount,
};
