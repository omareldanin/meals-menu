import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
import { useState } from "react";
const Checkout = (props) => {
  const isEmpty = (value) => value.trim() !== "";
  const isFiveChar = (value) => value.trim().length === 5;
  const {
    value: name,
    hasError: nameHasError,
    valueIsValid: nameIsValid,
    inputBlurHandler: NameBlurHandler,
    inputChangeHandler: nameChangeHandler,
    reset: nameReset,
  } = useInput(isEmpty);
  const {
    value: street,
    hasError: streetHasError,
    valueIsValid: streetIsValid,
    inputBlurHandler: streetBlurHandler,
    inputChangeHandler: streetChangeHandler,
    reset: streetReset,
  } = useInput(isEmpty);
  const {
    value: postal,
    hasError: postalHasError,
    valueIsValid: postalIsValid,
    inputBlurHandler: postalBlurHandler,
    inputChangeHandler: postalChangeHandler,
    reset: postalReset,
  } = useInput(isFiveChar);
  const {
    value: city,
    hasError: cityHasError,
    valueIsValid: cityIsValid,
    inputBlurHandler: cityBlurHandler,
    inputChangeHandler: cityChangeHandler,
    reset: cityReset,
  } = useInput(isEmpty);
  const formisValid =
    nameIsValid && streetIsValid && cityIsValid && postalIsValid;
  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formisValid) {
      return;
    }
    props.onConfirm({
      name,
      city,
      street,
      postal,
    });
    nameReset();
    cityReset();
    streetReset();
    postalReset();
  };
  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={NameBlurHandler}
        />
        {nameHasError && <p>Enter a Valid Name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Enter a Valid Street </p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && <p>Enter a Valid Postal Code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>enter a Valid City </p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
