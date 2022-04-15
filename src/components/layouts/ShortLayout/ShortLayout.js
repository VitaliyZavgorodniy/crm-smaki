import React from "react";
import styled, { useTheme } from "styled-components";

function ShortLayout({ children, tabs, user }) {
  const theme = useTheme();

  return <Wrapper theme={theme}>{children}</Wrapper>;
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(p) => p.theme.background};
`;

export default React.memo(ShortLayout);
