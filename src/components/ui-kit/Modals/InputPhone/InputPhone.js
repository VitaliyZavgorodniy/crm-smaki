import React from "react";
import styled from "styled-components";

const InputPhone = ({ value = "380", width = "170px", onChange }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length < 10) onChange(`380${e.target.value}`);
  };

  return (
    <Wrapper width={width}>
      <Title>Телефон</Title>
      <Field
        type='number'
        value={String(value).substring(3)}
        placeholder='XX0000000'
        onChange={handleChange}
      />
      <Holder>+380</Holder>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: ${(p) => p.width};
  margin: 5px 3px;
  padding-top: 12px;
`;

const Title = styled.span`
  position: relative;
  margin-bottom: 5px;
  padding: 0px 3px;
  border-radius: 3px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 14px;
`;

const Holder = styled.span`
  position: absolute;
  left: 8px;
  bottom: 9px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 18px;
`;

const Field = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 12px 8px 8px 53px;
  background-color: ${(p) => p.theme.backgroundLight};
  border: ${(p) => p.theme.inputBorder};
  border-radius: 8px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 18px;
  font-family: Rubik;
  outline: none;
  &:active,
  &:focus {
    border: 1px solid ${(p) => p.theme.accentColor};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default InputPhone;
