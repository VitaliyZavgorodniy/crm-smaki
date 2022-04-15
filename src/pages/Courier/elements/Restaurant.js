import React from "react";
import styled from "styled-components";

import iconSmaki from "assets/icons/smaki.png";
import iconGo from "assets/icons/go.png";

export const Restaurant = ({ data }) => {
  const imageSource = () => {
    if (data === "smaki") return iconSmaki;
    else if (data === "go") return iconGo;
    else return "Restaurant";
  };

  const titleSource = () => {
    if (data === "smaki") return "Smaki-Maki";
    else if (data === "go") return "SushiGo";
    else return "Restaurant";
  };

  return (
    <Wrapper>
      <Image src={imageSource()} />
      <Title>{titleSource()}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const Title = styled.span`
  font-size: 16px;
  color: #f79f21;
`;
