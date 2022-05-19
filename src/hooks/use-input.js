import { useState } from "react";
const useInput = (validation) => {
  const [value, setValue] = useState("");
  const [istouched, setIsTouched] = useState(false);

  const valueIsValid = validation(value);
  const hasError = !valueIsValid && istouched;
  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setValue("");
    setIsTouched(false);
  };
  return {
    value,
    hasError,
    valueIsValid,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  };
};
export default useInput;
