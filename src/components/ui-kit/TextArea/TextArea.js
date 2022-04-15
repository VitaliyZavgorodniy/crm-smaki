import React from "react";
import styled from "styled-components";

const TextArea = ({ title, value, onChange, width }) => {
  return (
    <Wrapper width={width}>
      <Title>{title}</Title>
      <Field value={value} placeholder={title} onChange={onChange} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: ${(p) => p.width};
`;

const Title = styled.span`
  position: absolute;

  margin-left: 8px;
  margin-bottom: 5px;
  padding: 0px 3px;

  background-color: #fff;
  border-radius: 3px;

  color: #1f2c40;
  font-size: 16px;
`;

const Field = styled.textarea`
  width: 100%;
  margin-top: 10px;
  padding: 12px 8px 8px 8px;
  background: #fff;
  border-radius: 8px;
  border: 2px solid #cdc9c3;
  color: #1f2c40;
  font-size: 18px;
  font-family: Rubik;
  outline-color: #5f76f9;
  resize: none;
  &:active,
  &:focus {
    border: 2px solid #5f76f9;
  }
`;

export default TextArea;
