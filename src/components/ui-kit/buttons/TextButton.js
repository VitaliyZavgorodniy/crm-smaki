import React from "react";
import styled, { useTheme } from "styled-components";

export const TextButton = ({ title, icon, onClick, size }) => {
  const theme = useTheme();

  return (
    <Wrapper onClick={onClick} theme={theme}>
      <Title>{title}</Title>
      {icon && <Icon>{icon}</Icon>}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  color: ${(p) => p.theme.secondaryColor};
  background-color: ${(p) => p.theme.accentColor};
  transition: background-color 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.proceedColor};
  }
`;

const Title = styled.span`
  font-family: Rubik, sans-serif;
  font-size: 18px;
  letter-spacing: 0.01em;
`;

const Icon = styled.span`
  color: ${(p) => p.theme.secondaryColor};
  height: 24px;
  width: 24px;
  margin-left: 5px;
  color: inherit;
`;
