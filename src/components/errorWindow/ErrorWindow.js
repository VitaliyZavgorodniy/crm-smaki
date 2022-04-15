import React from "react";
import styled, { useTheme } from "styled-components";

const ErrorWindow = () => {
  const theme = useTheme();

  const text = "якась помилка";

  const handleClose = () => {
    console.log("close");
  };

  return (
    <Container theme={theme}>
      <Wrapper onClick={handleClose}>
        <Header>
          <Title>Помилка</Title>
        </Header>
        <Body>
          <Text>{text}</Text>
        </Body>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 250px;
  background-image: ${(p) => p.theme.backgroundError};
  box-shadow: ${(p) => p.theme.shadow};
  border: ${(p) => p.theme.shadowBorder};
  border-radius: 8px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.backgroundActive};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Body = styled.div`
  /* padding: 4px; */
`;

const Title = styled.span`
  color: ${(p) => p.theme.accentColor};
`;

const Text = styled.span`
  color: ${(p) => p.theme.secondaryColor};
`;

export default ErrorWindow;
