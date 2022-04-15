import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";

import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import SvgIcon from "../SvgIcon";
import styles from "./Input.module.scss";

function Input({
  className,
  label,
  subLabel,
  value,
  placeholder,
  mask,
  valueKey,
  type,
  name,
  error,
  mode,
  readOnly,
  isShowError,
  iconleft,
  iconright,
  onLeftIconClick,
  onRightIconClick,
  onChange,
  onFocus,
  onBlur,
  ...rest
}) {
  const inputRef = useRef();

  const [maskValue, setMaskValue] = useState("");

  const id = `${Math.random()}`;

  const handleChange = (e) => {
    const { value: inputValue } = e.target;

    onChange({ valueKey, value: inputValue });
  };

  const handleFocus = () => {
    if (mask) {
      setMaskValue(mask);
    }

    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    if (mask && !value) {
      setMaskValue("");
    }

    if (onBlur) {
      onBlur();
    }
  };

  const getFieldClassName = () => {
    const fieldClassName = error
      ? `${styles.input__field_error} ${styles[`input__field_error_${mode}`]}`
      : `${styles.input__field} ${styles[mode]}`;

    return fieldClassName;
  };

  const getErrorClassName = () => {
    const errorClassName = error
      ? `${styles.input__error_visible}`
      : styles.input__error;

    return errorClassName;
  };

  const handleIconClick = (side) => () => {
    if (side === "left" && onLeftIconClick) {
      onLeftIconClick();
    }

    if (side === "right" && onRightIconClick) {
      onRightIconClick();
    }
  };

  return (
    <div className={`${styles.input} ${className} ${styles[`input_${mode}`]}`}>
      {label && (
        <label htmlFor={id}>
          {label}

          {subLabel && <span>{` ${subLabel}`}</span>}
        </label>
      )}

      <div className={styles["input__field-container"]}>
        <SvgIcon type={iconleft} onClick={handleIconClick("left")} />

        <StyledInput
          ref={inputRef}
          id={id}
          className={getFieldClassName()}
          value={value || maskValue}
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          readOnly={readOnly}
          autoComplete='off'
          {...((iconleft || iconright) && {
            style: {
              ...(iconleft && { paddingLeft: 35 }),
              ...(iconright && { paddingRight: 35 }),
            },
          })}
          {...rest}
        />

        <SvgIcon type={iconright} onClick={handleIconClick("right")} />
      </div>

      {isShowError && <p className={getErrorClassName()}>{error || "."}</p>}
    </div>
  );
}

const StyledInput = styled.input``;

export default React.memo(Input);
