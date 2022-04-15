import React from "react";
import styled, { useTheme } from "styled-components";

const Input = ({ title, value, onChange, width }) => {
  const theme = useTheme();

  return (
    <Wrapper theme={theme} width={width}>
      <Title>{title}</Title>
      <Field value={value} placeholder={title} onChange={onChange} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(p) => p.width};
  margin: 3px;
  padding-top: 4px;
`;

const Title = styled.span`
  margin-left: 4px;
  border-radius: 3px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 14px;
`;

const Field = styled.input`
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

export default Input;
