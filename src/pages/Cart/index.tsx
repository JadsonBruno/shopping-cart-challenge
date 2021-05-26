/**
 * IMPORTS
 */
import { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Confirm, Modal, Button } from 'semantic-ui-react';
import { Checkmark } from 'react-checkmark';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import * as Styles from './styles';

/**
 * TYPES
 */
import { Product } from './index.d';

/**
 * CODE
 */

/**
 * I render the cart component.
 *
 * :returns: cart component element
 */
const Cart = (): JSX.Element => {
  const { cart, clearCart, updateProductAmount } = useCart();
  const [shouldShowConfirmModal, setShouldShowConfirmModal] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const cartFormatted = cart.map((product) => ({
    ...product,
    formatedPrice: formatPrice(product.price),
    subtotal: formatPrice(product.price * product.amount),
  }));

  // sumTotal += product.amount * product.price;
  const total = formatPrice(
    cart.reduce((sumTotal, product) => sumTotal + product.amount * product.price,
      0),
  );

  // get history instance
  const history = useHistory();

  /**
   * I handle the product amount increment.
   *
   * :param product: product to be updated
   *
   * :returns: nothing
   */
  function handleProductIncrement(product: Product): void {
    updateProductAmount({
      productId: product.id,
      amount: product.amount + 1,
    });
  }

  /**
   * I handle the product amount decrement.
   *
   * :param product: product to be updated
   *
   * :returns: nothing
   */
  function handleProductDecrement(product: Product) {
    updateProductAmount({
      productId: product.id,
      amount: product.amount - 1,
    });
  }

  useEffect(() => {
    if (cart.length === 0) {
      setShouldShowConfirmModal(true);
    }
  }, [cart]);

  /**
   * I handle the modal confirmation.
   *
   * :returns: nothing
   */
  function handleModalConfirm(): void {
    // close modal
    setShouldShowConfirmModal(false);

    // redirect to root page
    history.push('/');
  }

  /**
   * I handle the checkout.
   *
   * :returns: nothing
   */
  function handleCheckout() {
    // show modal
    setShouldShowModal(true);
  }

  /**
   * I handle the final modal close.
   *
   * :returns: nothing
   */
  function handleClose() {
    // ensure cart is clear
    clearCart();

    // close modal
    setShouldShowModal(false);

    // redirect to root page
    history.push('/');
  }

  // return component
  return (
    <Styles.Container>
      <Styles.ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map((product) => (
            <tr data-testid="product" key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                />
              </td>
              <td>
                <strong>{product.name}</strong>
                <span>{product.formatedPrice}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 0}
                    onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>
                  {formatPrice(
                    product.amount * product.price,
                  )}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </Styles.ProductTable>

      <footer>
        <Styles.Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Styles.Total>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Finalizar pedido
        </button>
      </footer>
      <Confirm
        open={shouldShowConfirmModal}
        onConfirm={handleModalConfirm}
        onCancel={() => setShouldShowConfirmModal(false)}
        content="Carrinho vazio. Deseja voltar para a tela inicial?"
        confirmButton="Sim, voltar"
        cancelButton="Cancelar"
      />
      <Modal open={shouldShowModal} size="tiny">
        <Modal.Content>
          <Styles.ModalContentContainer>
            <Checkmark size="large" color="#2185d0" />
            <h1>Pedido realizado com sucesso!</h1>
          </Styles.ModalContentContainer>
          <Modal.Actions>
            <Styles.ModalContentContainer>
              <Button secondary onClick={handleClose}>
                Fechar
              </Button>
            </Styles.ModalContentContainer>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    </Styles.Container>
  );
};

export default Cart;
