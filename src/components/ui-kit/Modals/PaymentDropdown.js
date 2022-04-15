import React from "react";
import styled from "styled-components";

const PaymentDropdown = ({ title, value, onChange, width, data }) => {
  const renderOptions = () => {
    return data.map((item, index) => {
      return (
        <option key={index} value={item.name}>
          {item.title}
        </option>
      );
    });
  };

  return (
    <Wrapper width={width}>
      <Title>{title}</Title>
      <Field value={value} onChange={onChange}>
        {renderOptions()}
      </Field>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5px;
  width: ${(p) => p.width};
`;

const Title = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  margin-left: 6px;
`;

const Field = styled.select`
  width: 100%;
  padding: 8px;
  color: #1f2c40;
  background: #fff;
  border-radius: 8px;
  border: ${(p) => p.theme.inputBorder};
  font-family: Rubik;
`;

export default PaymentDropdown;
