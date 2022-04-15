import React from "react";
import styled, { useTheme } from "styled-components";

const RestaurantDropdown = ({ title, value, onChange, width }) => {
  const theme = useTheme();

  const data = [
    {
      title: "Smaki-Maki",
      name: "smaki",
    },
    { title: "Sushi-Go", name: "go" },
  ];

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
    <Wrapper theme={theme} width={width}>
      <Title>{title}</Title>
      <Field value={value} onChange={onChange}>
        {renderOptions()}
      </Field>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: ${(p) => p.width};
  margin: 5px 3px;
  padding-top: 12px;
`;

const Title = styled.p`
  position: absolute;
  top: 0;
  margin-left: 8px;
  border-radius: 3px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 14px;
`;

const Field = styled.select`
  width: 100%;
  padding: 12px 8px 8px 8px;
  background-color: ${(p) => p.theme.backgroundLight};
  border: ${(p) => p.theme.inputBorder};
  border-radius: 8px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 18px;
  font-family: Rubik;
  outline: none;
  &:active,
  &:focus {
    border: 1px solid ${(p) => p.theme.accentColor};
  }
`;

export default RestaurantDropdown;
