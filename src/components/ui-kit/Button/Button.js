import React from "react";
import styled from "styled-components";

import Loader from "../Spiner";

function Button({
  className,
  label,
  type,
  mode,
  isLoading,
  isDisabled,
  loaderProps,
  onClick,
  leftIcon,
  rightIcon,
  ...rest
}) {
  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    } else if (onClick) onClick();
    else return;
  };

  return (
    <StyledButtun
      onClick={handleClick}
      isDisabled={isDisabled}
      type={type}
      {...rest}
    >
      {isLoading ? <Loader {...loaderProps} /> : label}
    </StyledButtun>
  );
}

const StyledButtun = styled.button`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border: 2px solid #eda240;
  border-radius: 10px;
  color: #eda240;
  font-size: 18px;
  letter-spacing: 0.04em;
  opacity: ${(p) => (p.isDisabled ? "0.5" : "1")};
  transition: color 200ms, background-color 200ms;

  &:hover {
    cursor: pointer;
    color: ${(p) => !p.isDisabled && "#fff"};
    background-color: ${(p) => !p.isDisabled && "#eda240"};
  }
`;

export default React.memo(Button);
