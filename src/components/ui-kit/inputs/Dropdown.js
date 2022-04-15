import React from "react";
import styled, { useTheme } from "styled-components";

// data = {title: 'TITLE', value: 'VALUE'}

export const Dropdown = ({ title, value, onChange, width, list }) => {
  const theme = useTheme();

  const renderOptions = () => {
    return list.map((item, index) => {
      return (
        <option key={index} value={item.value}>
          {item.title}
        </option>
      );
    });
  };

  return (
    <Wrapper theme={theme} width={width}>
      <Title>{title}</Title>
      <Field value={value} onChange={onChange}>
        {renderOptions()}
      </Field>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 4px;
  border-radius: 3px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 14px;
`;

const Title = styled.p`
  margin-left: 4px;
  border-radius: 3px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 14px;
`;

const Field = styled.select`
  width: 100%;
  margin-top: 4px;
  padding: 8px;
  background-color: ${(p) => p.theme.backgroundLight};
  border: ${(p) => p.theme.inputBorder};
  border-radius: 8px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 18px;
  font-family: Rubik;
  outline: none;
  &:active,
  &:focus {
    border: 2px solid ${(p) => p.theme.accentColor};
  }
`;
