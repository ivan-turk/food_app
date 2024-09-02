import React from "react";
import InputContainer from "../InputContainer/InputContainer";
import classes from "./input.module.css";
function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    //defaults
    switch (error.type) {
      case "required":
        return "Ovo polje je obavezno";
      case "minLength":
        return "Ovo polje je prekratko";
      default:
        return "*";
    }
  };

  const inputClass =
    type === "checkbox"
      ? `${classes.input} ${classes.checkbox}`
      : classes.input;

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className={inputClass}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
