import React from "react";
import styled from "styled-components";

const CookPage = ({ user }) => {
  return (
    <Wrapper>
      cook
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  /* z-index: 100; */
  background-color: #fff;
`;

export default React.memo(CookPage);