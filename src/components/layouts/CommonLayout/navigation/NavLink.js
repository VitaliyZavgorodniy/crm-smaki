import React from "react";
import styled, { useTheme } from "styled-components";

import history from "constants/history";

export const NavLink = ({ title, path, isActive, onClick }) => {
  const theme = useTheme();

  return (
    <Wrapper onClick={onClick} theme={theme} isActive={isActive}>
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px;
  background-color: ${(p) =>
    p.isActive ? p.theme.backgroundActive : "transparent"};
  border-bottom: 4px solid
    ${(p) => (p.isActive ? p.theme.accentColor : "transparent")};
  color: ${(p) => (p.isActive ? p.theme.accentColor : p.theme.secondaryColor)};
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.backgroundHover};
    color: ${(p) => p.theme.accentColor};
  }
`;
