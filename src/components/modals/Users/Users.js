import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { parsePhone } from "../../../utils/helpers/parsers";
import { validateUser } from "../../../utils/validation";
import Button from "../../ui-kit/Button";
import Input from "../../ui-kit/Input";
import Radio from "../../ui-kit/Radio";
import Select from "../../ui-kit/Select";
import SvgIcon from "../../ui-kit/SvgIcon";
import Base from "../Base";
import styles from "./Users.module.scss";

const DEFAULT_PHONE_VALUE = "+38 (";
const DEFAULT_OPTION = { value: "undefined", label: "Не указано" };
const RADIO_SCHEME = [
  { value: "active", label: "Активен" },
  { value: "disabled", label: "Неактивен" },
];

function Users({
  isOpen,
  closeAllModals,
  clearEditedUser,
  updateEditedUser,
  createUser,
  editUser,
  editedUser,
  cities,
  kitchens,
  roles,
  productTypes,
}) {
  const theme = useTheme();

  const {
    first_name,
    last_name,
    phone,
    position,
    kitchen,
    city,
    status,
    iiko_id,
  } = editedUser;

  const [citiesData, setCitiesData] = useState({ cities, choosenCity: {} });
  const [kitchensData, setKitchensData] = useState({
    kitchens,
    choosenKitchen: {},
  });
  const [rolesData, setRolesData] = useState({ roles, choosenRole: {} });
  const [productTypesData, setProductTypesData] = useState({
    productTypes,
    choosenTypes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    password: "",
    status: RADIO_SCHEME.find((el) => el.label === status)?.value || "active",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    iiko_id: "",
    city: "",
    position: "",
    kitchen: "",
  });

  useEffect(() => {
    prepareCities();
    prepareKitchens();
    prepareRoles();
  }, []);

  const prepareCities = () => {
    const output = cities.map((el) => {
      const option = { value: el.sync_id, label: el.name };

      return option;
    });

    const choosenCity =
      output.find((el) => el.label === city) || DEFAULT_OPTION;

    setCitiesData(() => ({ choosenCity, cities: output }));
  };

  const prepareKitchens = () => {
    const output = kitchens.map((el) => {
      const option = { ...el, value: el.code, label: el.title };

      return option;
    });

    const choosenKitchen =
      output.find((el) => el.label === kitchen) || DEFAULT_OPTION;

    setKitchensData(() => ({ choosenKitchen, kitchens: output }));
  };

  const prepareRoles = () => {
    const output = roles.map((el) => {
      const option = { value: el.name, label: el.title };

      return option;
    });

    const choosenRole =
      output.find((el) => el.label === position || el.value === position) ||
      DEFAULT_OPTION;

    setRolesData(() => ({ choosenRole, roles: output }));
  };

  const handleCloseModal = () => {
    closeAllModals();
    clearEditedUser();
  };

  const handleUserChange = ({ valueKey, value }) => {
    const user = { ...editedUser };
    const isNeedSafeDefaultValue = valueKey === "phone" && value.length < 5;
    const isNeedtoRemoveAfterBracket =
      valueKey === "phone" && value.length === 9;
    const isNeedToAddBracket =
      valueKey === "phone" &&
      value.length === 8 &&
      value.length > user.phone.length;

    switch (valueKey) {
      case "productType": {
        user.productTypes = value.map((el) => el.value);

        setProductTypesData((prev) => ({ ...prev, choosenTypes: value }));
        break;
      }

      case "city":
        user.city = value.label;

        setCitiesData((prev) => ({ ...prev, choosenCity: value }));
        break;
      case "kitchen":
        user.kitchen = value.label;

        setKitchensData((prev) => ({ ...prev, choosenKitchen: value }));
        break;
      case "position":
        user.position = value.label;

        setRolesData((prev) => ({ ...prev, choosenRole: value }));
        break;
      case "first_name":
      case "last_name":
      case "iiko_id":
        user[valueKey] = value;
        break;
      case "phone":
        if (isNeedSafeDefaultValue) {
          setInputs((prev) => ({ ...prev, [valueKey]: "" }));

          return;
        }

        if (isNeedToAddBracket) {
          user.phone = `${value})`;
        } else if (isNeedtoRemoveAfterBracket) {
          user.phone = value.slice(0, -2);
        } else {
          user.phone = value;
        }

        break;
      case "status":
        user.status = value.value;
        setInputs((prev) => ({ ...prev, status: value.value }));
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [valueKey]: "" }));
    updateEditedUser(user);
  };

  const handleInputChange = ({ valueKey, value }) => {
    setInputs((prev) => ({ ...prev, [valueKey]: value }));

    setErrors((prev) => ({ ...prev, [valueKey]: "" }));
  };

  const handleSubmit = () => {
    const parsedPhone = parsePhone(`${phone}`);
    const isEdit = editedUser.hasOwnProperty("id");
    const action = isEdit ? editUser : createUser;

    validateUser({
      data: {
        phone: parsedPhone,
        first_name,
        last_name,
        password: inputs.password,
        city,
        position,
        kitchen,
        status: status || "active",
      },
      onSuccess: async (validData) => {
        setIsLoading(true);

        await action({
          user: {
            ...validData,
            iiko_id: editedUser.iiko_id,
            ...(inputs.password && { password: inputs.password }),
            ...(editedUser.productTypes && {
              product_types: editedUser.productTypes,
            }),
          },
          onSuccess: () => {
            handleCloseModal();
            setIsLoading(false);
          },
          onError: (inputsErrors) => {
            setErrors(inputsErrors);
            setIsLoading(false);
          },
          id: editedUser.id,
        });
      },
      onError: (validationErrors) => {
        setErrors(validationErrors);
      },
    });
  };

  const renderProductTypeField = () => {
    if (editedUser.position !== "Повар") {
      return null;
    }

    return (
      <Select
        selectOptions={productTypesData.productTypes}
        selectedOption={productTypesData.choosenTypes}
        valueKey='productType'
        label='Тип повара'
        error={errors.position}
        isMulti
        onChange={handleUserChange}
      />
    );
  };

  return (
    <Wrapper theme={theme} isOpen={isOpen}>
      <Base
        onClose={handleCloseModal}
        configuration={{
          name: "productCreate",
          fields: [
            {
              type: "customField",
              renderCustomField: () => (
                <div className={styles.header}>
                  <p className={`${styles.header__name} font-600`}>
                    {`${first_name || ""} ${last_name || ""}`}
                  </p>

                  <SvgIcon
                    type='close'
                    className={styles.header__close}
                    onClick={handleCloseModal}
                  />
                </div>
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Input
                  label='Имя'
                  value={first_name}
                  valueKey='first_name'
                  error={errors.first_name}
                  mode='secondary'
                  placeholder='Введите имя'
                  onChange={handleUserChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Input
                  label='Фамилия'
                  value={last_name}
                  valueKey='last_name'
                  error={errors.last_name}
                  mode='secondary'
                  placeholder='Введите фамилию'
                  onChange={handleUserChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Input
                  label='Телефон'
                  value={`${phone}`}
                  valueKey='phone'
                  mask={DEFAULT_PHONE_VALUE}
                  error={errors.phone}
                  mode='secondary'
                  placeholder='Введите телефон'
                  onChange={handleUserChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Input
                  label='Пароль'
                  value={inputs.password}
                  valueKey='password'
                  error={errors.password}
                  mode='secondary'
                  type='password'
                  placeholder='Введите пароль'
                  onChange={handleInputChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Input
                  label='IIKO ID'
                  value={iiko_id || ""}
                  valueKey='iiko_id'
                  error={errors.iiko_id}
                  mode='secondary'
                  placeholder='Введите IIKO ID'
                  onChange={handleUserChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Select
                  selectOptions={citiesData.cities}
                  selectedOption={citiesData.choosenCity}
                  valueKey='city'
                  label='Город'
                  error={errors.city}
                  onChange={handleUserChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Select
                  selectOptions={rolesData.roles}
                  selectedOption={rolesData.choosenRole}
                  valueKey='position'
                  label='Должность'
                  error={errors.position}
                  onChange={handleUserChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => renderProductTypeField(),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Select
                  selectOptions={kitchensData.kitchens}
                  selectedOption={kitchensData.choosenKitchen}
                  valueKey='kitchen'
                  label='Кухня'
                  error={errors.kitchen}
                  onChange={handleUserChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <Radio
                  items={RADIO_SCHEME}
                  label='Доступ'
                  valueKey='status'
                  value={inputs.status}
                  onChange={handleUserChange}
                />
              ),
            },
            {
              type: "customField",
              renderCustomField: () => (
                <div className={styles.footer}>
                  <Button
                    label='Сохранить'
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  />
                </div>
              ),
            },
          ],
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  right: ${(p) => (p.isOpen ? "0" : "-1000px")};
  top: 0;
  z-index: 100;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 460px;
  padding-bottom: 30px;
  background-color: ${(p) => p.theme.background};
  transition: 200ms right;
`;

Users.propTypes = {
  closeAllModals: PropTypes.func.isRequired,
  clearEditedUser: PropTypes.func.isRequired,
  updateEditedUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  editedUser: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  kitchens: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  editUser: PropTypes.func.isRequired,
  productTypes: PropTypes.array.isRequired,
};

export default Users;
