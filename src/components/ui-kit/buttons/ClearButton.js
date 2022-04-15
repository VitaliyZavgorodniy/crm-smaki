import React from "react";
import styled, { useTheme } from "styled-components";

export const ClearButton = ({ title, onClick, isActive }) => {
  const theme = useTheme();

  return (
    <Wrapper theme={theme} onClick={onClick} isActive={isActive}>
      <Title>{title}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  color: ${(p) => p.theme.accentColor};
  background-color: ${(p) =>
    p.isActive ? p.theme.backgroundActive : "transparent"};
  transition: background-color 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.backgroundHover};
  }
`;

const Title = styled.span`
  font-family: Rubik, sans-serif;
  font-size: 16px;
  letter-spacing: 0.01em;
`;
