import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  })
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const isValid = value => value !== '';
  const isFiveChar = value => value.length === 5;

  const confirmHandler = (e) => {
    e.preventDefault()
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = isValid(enteredName);
    const streetIsValid = isValid(enteredStreet);
    const postalIsValid = isFiveChar(enteredPostal);
    const cityIsValid = isValid(enteredCity);

    const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid
    setFormInputIsValid({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid
    })

    if (!formIsValid) {
      return;
    } else {
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
      })
    }
  }
  const nameClasses = `${classes.control} ${formInputIsValid.name ? "" : classes.invalid}`
  const streetClasses = `${classes.control} ${formInputIsValid.name ? "" : classes.invalid}`
  const postalClasses = `${classes.control} ${formInputIsValid.name ? "" : classes.invalid}`
  const cityClasses = `${classes.control} ${formInputIsValid.name ? "" : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses} >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputIsValid.name && <p>Field cannot be empty</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputIsValid.street && <p>Field cannot be empty</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputIsValid.postal && <p>Field must be five charracters long</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputIsValid.city && <p>Field cannot be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel} >Cancel</button>
        <button className={classes.submit}  >Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;