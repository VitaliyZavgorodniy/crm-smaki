import React from "react";
import styled from "styled-components";

const Pagination = ({ onClick }) => {
  return (
    <Wrapper>
      <Button onClick={() => onClick(1)}>1</Button>
      <Button onClick={() => onClick(2)}>2</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
`;

const Button = styled.button`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
`;

export default Pagination;
