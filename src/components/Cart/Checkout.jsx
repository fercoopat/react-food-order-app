/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = ({ onConfirm, onCancel }) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setFormInputsValidity({
      name: !isEmpty(enteredName),
      street: !isEmpty(enteredStreet),
      postal: isFiveChars(enteredPostal),
      city: !isEmpty(enteredCity),
    });

    const formIsValid =
      !isEmpty(enteredName) &&
      !isEmpty(enteredStreet) &&
      isFiveChars(enteredPostal) &&
      !isEmpty(enteredCity);

    if (!formIsValid) {
      return;
    }

    onConfirm({ enteredName, enteredStreet, enteredPostal, enteredCity });
  };

  const controlClassesHandler = (value) =>
    `${classes.control} ${formInputsValidity[value] ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={controlClassesHandler('name')}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please entered a valid name!</p>}
      </div>

      <div className={controlClassesHandler('street')}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please entered a valid street!</p>}
      </div>

      <div className={controlClassesHandler('postal')}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please entered a valid postal!</p>}
      </div>

      <div className={controlClassesHandler('city')}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please entered a valid city!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
