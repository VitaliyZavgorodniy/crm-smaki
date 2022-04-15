import React from "react";
import styled, { useTheme } from "styled-components";
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export const DatePicker = ({ title, value, onChange = () => { }, width, min, max, disabled }) => {
  const theme = useTheme();

  return (
    <Wrapper theme={theme} width={width}>
      <Title>{title}</Title>
      <Label>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            inputFormat="YYYY:MM:DD"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
            maxDate={max}
            minDate={min}
            disabled={disabled}
          />
        </LocalizationProvider>
      </Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: ${(p) => p.width};
  margin: 3px;
  padding-top: 4px;
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

const Label = styled.label`
  position: relative;

  .MuiFormControl-root {
    margin-top: 5px;
    position: relative;
  }

  .MuiOutlinedInput-root {
    border-radius: 8px;
    border: ${(p) => p.theme.inputBorder};
    background-color: ${(p) => p.theme.backgroundLight};
    color: ${(p) => p.theme.secondaryColor};
    box-shadow: none;
    outline: none;
    height: 44px;
    &:active,
    &:focus {
      border: 2px solid ${(p) => p.theme.accentColor};
    }
  }

  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .Mui-focused {
    border: 2px solid ${(p) => p.theme.accentColor};
  }

  svg {
    fill: #fff;
  }

  .MuiButtonBase-root {
    position: inherit;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled {
      color: #597275;
      input {
        color: #597275;
        -webkit-text-fill-color: #597275;
      }
      svg {
          fill: #597275;
      }
  }
`;

const Icon = styled.span`
  width: 24px;
  height: 24px;
  color: ${(p) => p.theme.secondaryColor};
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(p) => p.theme.backgroundLight};
`;
