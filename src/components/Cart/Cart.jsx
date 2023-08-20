/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';
import useFetch from '../../hooks/useFetch';

const BASE_URL = 'http://localhost:3000/orders';

const Cart = (props) => {
  const { addData, isLoading, error } = useFetch();

  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    addData(BASE_URL, {
      user: userData,
      orderedItems: cartCtx.items,
    });

    cartCtx.clearCart();
    props.onClose();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {cartItems}

          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>

          {isCheckout && hasItems && (
            <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
          )}

          {!isCheckout && modalActions}
        </>
      )}
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {isLoading && !error ? <p>Sending order data...</p> : cartModalContent}
    </Modal>
  );
};

export default Cart;
