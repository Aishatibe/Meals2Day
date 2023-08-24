import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleOrder = () => {
    setCheckout(true);
  };
  const handleConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-2c95c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart()
  };


  const cartItems = (
    <ul className={classes["cart-items"]}>
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
  const modalBTN = (
    <div className={classes.actions}>
      {!hasItems && <p>Oohps! Cart is empty</p>}
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onCancel={props.onClose} onConfirm={handleConfirmHandler} />
      )}
      {!checkout && modalBTN}
    </React.Fragment>
  );
  const submittingContent = <p>Sending your order, please wait ....</p>;

  const submittedContent = (
    <React.Fragment>
      <p>Your order has been successfully submitted.</p>
      <p>Thank you for your patronage</p>
      <button className={classes.button} onClick={props.onClose} >Close</button>
    </React.Fragment>
  );
  return <Modal onClose={props.onClose}>
    {!isSubmitting && !isSubmitted && modalContent}
    {isSubmitting && submittingContent}
    {isSubmitted && submittedContent}
  </Modal>;
};

export default Cart;
