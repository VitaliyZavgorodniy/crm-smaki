import React from "react";
import styled from "styled-components";

const Heading = ({ size, title }) => {
  return <Title size={size}>{title}</Title>;
};

const Title = styled.h3`
  color: #262836;
  font-weight: 700;
  font-size: ${(p) => (p.size ? p.size : "32px")};
  padding: 15px 0;
`;

export default React.memo(Heading);
