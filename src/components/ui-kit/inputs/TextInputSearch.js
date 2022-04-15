import React from "react";
import styled, { useTheme } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

export const TextInputSearch = ({
  title,
  value,
  onChange,
  width,
  isSearch = false,
  onChangeButtonSearch = () => { }
}) => {
  const theme = useTheme();

  return (
    <Wrapper theme={theme} width={width}>
      <Title>{title}</Title>
      <Content>
        <Field
          value={value}
          placeholder={title}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChangeButtonSearch(value);
            }
          }}
        />
        {
          isSearch && (
            <ButtonSearch onClick={() => onChangeButtonSearch(value)}>
              <SearchIcon />
            </ButtonSearch>
          )
        }
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(p) => p.width};
  margin: 3px;
  padding-top: 4px;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonSearch = styled.button`
  width: 26px;
  height: 26px;
  position: absolute;
  right: 10px;
  top: 54%;
  transform: translateY(-50%);
  background: transparent;
  cursor: pointer;
  svg {
    color: ${(p) => p.theme.secondaryColor};
  }
  &:hover {
    svg {
      color: ${(p) => p.theme.accentColor};
    }
  }
`;

const Title = styled.span`
  margin-left: 4px;
  border-radius: 3px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 14px;
`;

const Field = styled.input`
  width: 100%;
  margin-top: 4px;
  padding: 8px;
  background-color: ${(p) => p.theme.backgroundLight};
  border: ${(p) => p.theme.inputBorder};
  border-radius: 8px;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 18px;
  font-family: Rubik;
  outline: none;
  &:active,
  &:focus {
    border: 2px solid ${(p) => p.theme.accentColor};
  }
`;
