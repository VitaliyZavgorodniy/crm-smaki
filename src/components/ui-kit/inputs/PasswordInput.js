import React, { useState } from "react";
import styled from "styled-components";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const PasswordInput = ({
  onChange,
  value,
  valueKey,
  isError,
  isFetching,
}) => {
  const [isVisiblie, setVisible] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    onChange({ valueKey, value });
  };

  return (
    <Wrapper>
      <Field
        isError={isError}
        type={isVisiblie ? "text" : "password"}
        onChange={handleChange}
        value={value}
        placeholder='Пароль'
        disabled={isFetching}
      />
      
      <Holder onClick={() => setVisible(!isVisiblie)}>
        {isVisiblie ? (
          <VisibilityOffIcon
            style={{ color: isError ? "#F90716" : "#eda240" }}
          />
        ) : (
          <VisibilityIcon style={{ color: isError ? "#F90716" : "#eda240" }} />
        )}
      </Holder>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 260px;
  margin-bottom: 25px;
`;

const Holder = styled.button`
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #fff;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }
`;

const Field = styled.input`
  width: 100%;
  padding: 8px 8px 8px 32px;
  background: #fff;
  background-color: #2d303e;
  border: 2px solid ${(p) => (p.isError ? "#F90716" : "#393d49")};
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-family: Rubik;
  outline-color: #eda240;
  -moz-appearance: textfield;
  &:active,
  &:focus {
    border: 2px solid #5f76f9;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::placeholder {
    color: #eee;
    font-size: 18px;
    font-family: Rubik;
  }
`;
