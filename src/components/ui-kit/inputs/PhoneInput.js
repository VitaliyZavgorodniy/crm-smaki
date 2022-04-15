import React from "react";
import styled from "styled-components";

import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

export const PhoneInput = ({
  onChange,
  value = "380",
  valueKey,
  isError,
  isFetching,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length < 10)
      onChange({ valueKey, value: `380${e.target.value}` });
  };

  return (
    <Wrapper>
      <Holder>
        <PhoneAndroidIcon
          style={{ color: isError ? "#F90716" : "#eda240", marginRight: 5 }}
        />
        +380
      </Holder>
      <Field
        isError={isError}
        type='number'
        onChange={handleChange}
        value={String(value).substring(3)}
        disabled={isFetching}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 260px;
  margin-bottom: 15px;
`;

const Holder = styled.span`
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
`;

const Field = styled.input`
  width: 100%;
  padding: 8px 8px 8px 77px;
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
`;
