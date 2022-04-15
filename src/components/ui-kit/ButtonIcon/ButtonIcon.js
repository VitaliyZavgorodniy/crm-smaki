import React from "react";
import styled, { useTheme } from "styled-components";

const ButtonIcon = ({
  title,
  icon,
  onClick,
  disabled = false,
  colorBg = "",
}) => {
  const theme = useTheme();
  colorBg = colorBg.length ? colorBg : theme.accentColor;

  return (
    <Wrapper
      onClick={onClick}
      theme={theme}
      disabled={disabled}
      colorBg={colorBg}
    >
      <Title>{title}</Title>
      <Icon>{icon}</Icon>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  color: ${(p) => p.theme.secondaryColor};
  background-color: ${(p) => p.colorBg};
  transition: background-color 200ms ease-in-out;
  &:disabled {
    opacity: 0.7;
    pointer-events: none;
  }

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

export default ButtonIcon;
