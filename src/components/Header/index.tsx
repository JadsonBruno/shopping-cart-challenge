/**
 * IMPORTS
 */
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import logo from '../../assets/images/logo.svg';
import { Container, Cart } from './styles';
import { useCart } from '../../hooks/useCart';

/**
 * CODE
 */

/**
 * I render the header component.
 *
 * :returns: header component element
 */
const Header = (): JSX.Element => {
  // get cart from context
  const { cart } = useCart();

  // get current cart size
  const cartSize = cart.length;

  // return component
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span data-testid="cart-size">
            {cartSize === 1
              ? `${cartSize} item`
              : `${cartSize} itens`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};

/**
 * EXPORTS
 */
export default Header;
