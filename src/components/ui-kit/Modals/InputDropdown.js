import React from "react";
import styled from "styled-components";

const InputDropdown = ({ title, value, onChange, width, list }) => {
  const renderOptions = () => {
    return list.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };

  return (
    <Wrapper width={width}>
      <Title>{title}</Title>
      <Field value={value} onChange={onChange}>
        {renderOptions()}
      </Field>
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
  position: absolute;
  top: 0;
  margin-left: 8px;
  border-radius: 3px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 14px;
`;

const Field = styled.select`
  width: 100%;
  padding: 12px 8px 8px 8px;
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
`;

export default InputDropdown;
