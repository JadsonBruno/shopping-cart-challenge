/**
 * IMPORTS
 */
import { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react';
import * as Styles from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';

/**
 * TYPES
 */
import {
  CartItemsAmount,
  Category,
  Product,
  ProductFormatted,
} from './index.d';

/**
 * CODE
 */

/**
 * I render the home component.
 *
 * :returns: home component element
 */
const Home = (): JSX.Element => {
  // define getters and setters
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<
        ProductFormatted[]
    >([]);
  const [categories, setCategories] = useState<DropdownItemProps[]>([]);

  // get cart handlers
  const { addProduct, cart } = useCart();

  // define current cart items amount for every product
  const cartItemsAmount = cart.reduce((sumAmount, product) => ({
    ...sumAmount,
    [product.id]: product.amount,
  }), {} as CartItemsAmount);

  /**
   * I load all categories.
   *
   * :returns: promise with nothing
   */
  async function loadCategories(): Promise<void> {
    // request categories
    const response = await api.get<Category[]>('/categories');

    // get categories array
    const categoriesArray = response.data;

    // create categories dropdown array
    const categoriesDropDownArray = categoriesArray.map((category) => ({
      key: category.id,
      value: category.id,
      text: category.name,
    }));

    // set categories to local state
    setCategories(categoriesDropDownArray);
  }

  /**
   * I load all products.
   *
   * :returns: promise with nothing
   */
  async function loadProducts(): Promise<void> {
    // request products
    const response = await api.get('/products');

    // get products array
    const productsArray: Product[] = response.data;

    // create products formated array
    const productsFormated = productsArray.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    // set products to local state
    setProducts([...productsFormated]);

    // set products to products by category state
    setProductsByCategory([...productsFormated]);
  }

  // listen to component mount
  useEffect(() => {
    // get all products
    loadProducts();

    // get all categories
    loadCategories();
  }, []);

  /**
   * I handle the add product to cart.
   *
   * :param id: product ID to be added
   *
   * :returns: nothing
   */
  function handleAddProduct(id: number) {
    addProduct(id);
  }

  /**
   * I handle the category change.
   *
   * :param e: HTML event
   * :param data: dropdown data value
   *
   * :returns: nothing
   */
  function handleCategoryChange(
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps,
  ) {
    // category not selected: set all product and finish
    if (data?.value === '') {
      setProductsByCategory([...products]);
      return;
    }

    // category selected: filter products by category
    const formatedProducts = products.filter(
      (product) => product.idCategory === Number(data.value),
    );

    // set products by selected category
    setProductsByCategory([...formatedProducts]);
  }

  // return component
  return (
    <Styles.Container>
      <Dropdown
        placeholder="Selecione a categoria"
        fluid
        search
        selection
        clearable
        options={categories}
        onChange={handleCategoryChange}
      />
      <Styles.ProductList>
        {productsByCategory.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <strong>{product.name}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div data-testid="cart-product-quantity">
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </Styles.ProductList>
    </Styles.Container>
  );
};

/**
 * EXPORTS
 */
export default Home;
