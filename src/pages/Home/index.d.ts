/**
 * CODE
 */
interface Product {
    id: number;
    name: string;
    idCategory: number;
    price: number;
    image: string;
}

interface Category {
    id: number;
    name: string;
}

interface ProductFormatted extends Product {
    priceFormatted: string;
}

interface CartItemsAmount {
    [key: number]: number;
}

/**
 * EXPORTS
 */
export {
  CartItemsAmount, Category, Product, ProductFormatted,
};
