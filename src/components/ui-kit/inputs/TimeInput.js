import React from "react";
import styled, { useTheme } from "styled-components";
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import ruLocale from 'date-fns/locale/ru';

export const TimeInput = ({ title, value, onChange, width, min, max, minutesStep=5 }) => {
  const theme = useTheme();
 
  return (
    <Wrapper theme={theme} width={width} locale={ruLocale}>
      <Title>{title}</Title>
      <Label>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <TimePicker
            ampm={false}
            openTo="hours"
            views={['hours', 'minutes']}
            mask="__:__"
            value={value}
            onChange={onChange}
            minTime={min}
            maxTime={max}
            minutesStep={minutesStep}
            renderInput={(params) => <TextField {...params} />}
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
`;