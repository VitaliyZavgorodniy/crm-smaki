import React from "react";
import styled, { useTheme } from "styled-components";

export const IconButton = ({ icon, onClick, size }) => {
  const theme = useTheme();

  return (
    <StyledButton theme={theme} onClick={onClick} size={size}>
      {icon ? icon : "err"}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  padding: 5px;
  color: ${(p) => p.theme.accentColor};
  border-radius: 50%;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.backgroundHover};
  }
`;
