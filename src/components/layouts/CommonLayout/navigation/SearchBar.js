import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SearchBar = () => {
  const user = useSelector((store) => store.user.user);
  // console.log(user);
  return (
    <Wrapper>
      Привіт, <span>{user?.first_name}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  color: #fff;

  & span {
    color: #eda240;
    margin-left: 6px;
  }
`;

export default React.memo(SearchBar);
