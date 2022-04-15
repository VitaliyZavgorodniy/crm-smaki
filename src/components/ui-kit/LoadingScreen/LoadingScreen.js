import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import Loader from "react-loader-spinner";

import logo from "assets/icons/icon.svg";

const texts = [
  "миємо посуд",
  "збираємо упаковки",
  "чистимо пічки",
  "драїм пательні",
  "вирізаємо палички",
  "ловимо лосось",
  "накачуємо колеса",
  "малюємо карти",
  "заряджаємо телефони",
];

const LoadingScreen = () => {
  const theme = useTheme();

  const [label, setLabel] = useState(null);

  useEffect(() => {
    setLabel(randomizedText());

    const interval = setInterval(() => {
      setLabel(randomizedText());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const randomizedText = () => {
    const number = Math.floor(Math.random() * texts.length);
    return texts[number];
  };

  return (
    <Wrapper theme={theme}>
      <Container>
        <Logo src={logo} />
        <Loader type='Oval' color='#EDA240' width='30' height='30' />
        <Label>{label && label}</Label>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(p) => p.theme.background};
  color: #fff;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 15px;
`;

const Label = styled.div`
  position: absolute;
  width: 320px;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

export default React.memo(LoadingScreen);
