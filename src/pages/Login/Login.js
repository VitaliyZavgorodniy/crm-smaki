import PropTypes from "prop-types";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

import { ORDERS } from "../../constants/routes";
import history from "constants/history";

import { parsePhone } from "utils/helpers/parsers";
import { decodeErrorObject, validateCreateSession } from "utils/validation";

import Button from "components/ui-kit/Button/Button";
import { PhoneInput } from "components/ui-kit/inputs/PhoneInput";
import { PasswordInput } from "components/ui-kit/inputs/PasswordInput";

function Login({ login }) {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });
  const [inputs, setInputs] = useState({
    phone: "380",
    password: "",
  });

  const handleInputChange = ({ valueKey, value }) => {
    setInputs((prev) => ({ ...prev, [valueKey]: value }));
    setErrors((prev) => ({ ...prev, [valueKey]: "" }));
    setIsFormValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { phone, password } = inputs;
    const parsedPhone = parsePhone(phone);

    validateCreateSession({
      data: {
        phone: parsedPhone,
        password,
      },
      onSuccess: async (validData) => {
        setIsLoading(true);

        await login({
          ...validData,
          onSuccess: () => {
            setIsLoading(false);
            history.replace(ORDERS);
          },
          onError: () => {
            const error = decodeErrorObject({ phone: "INVALID_LOGIN_DATA" });

            setErrors(error);
            setIsFormValid(false);
            setIsLoading(false);
          },
        });
      },
      onError: (validationErrors) => {
        setErrors(validationErrors);
        setIsFormValid(false);
      },
    });
  };

  return (
    <Wrapper theme={theme}>
      <FormWrapper>
        <Title>Авторизація</Title>

        <Form onSubmit={handleSubmit}>
          <PhoneInput
            valueKey='phone'
            value={inputs.phone}
            onChange={handleInputChange}
            isError={errors.phone}
            isFetching={isLoading}
          />

          <PasswordInput
            valueKey='password'
            value={inputs.password}
            onChange={handleInputChange}
            isError={errors.password}
            isFetching={isLoading}
          />

          <Button
            label='Війти'
            type='submit'
            isLoading={isLoading}
            isDisabled={isLoading || !isFormValid}
          />
        </Form>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(p) => p.theme.background};
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 25px;
  text-align: center;
  color: ${(p) => p.theme.secondaryColor};
  font-size: 24px;
  letter-spacing: 0.03em;
`;

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default React.memo(Login);
