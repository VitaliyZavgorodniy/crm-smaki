import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";

import { Dropdown } from "components/ui-kit/inputs/Dropdown";

import { citiesMapped } from "utils/mappers/cities";
import { kitchensMapped } from "utils/mappers/kitchens";
import { saveData, removeItem, getData } from "utils/helpers/localStorage";
import { removeEmpty } from "utils/helpers/removeEmptyFromObj";

import ButtonIcon from "components/ui-kit/ButtonIcon";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const keyLocalStorageFilter = 'dataFilterCallCenter';

const EditorCallcenter = ({
    isOpen,
    kitchens,
    cities,
    // mapDispatch
    closeModalFilter,
    getAllActiveOrders,
}) => {
    const theme = useTheme();

    const [selectCities, setSelectCities] = useState("");
    const [selectKitchen, setSelectKitchen] = useState("");
    const [disabledBtnClear, setDisabledBtnClear] = useState(false);
    const [disabledBtnSubmit, setDisabledBtnSubmit] = useState(false);
    const [update, setUpdate] = useState();

    let citiesConvert = [...[{ title: "Всі", value: '' }], ...citiesMapped(cities)];
    let kitchensKovert = [...[{ title: "Всі", value: '' }], ...kitchensMapped(kitchens)];

    const handleCloseWindow = () => {
        closeModalFilter();
    }

    const clearState = () => {
        setSelectCities(citiesConvert[0].value);
        setSelectKitchen(kitchensKovert[0].value);
    }

    const handleSubmit = () => {
        let params = {
            kitchen_code: selectKitchen,
            city_sync_id: selectCities,
        };

        params = removeEmpty(params);

        if (Object.keys(params).length) {
            saveData(keyLocalStorageFilter, params);
        } else {
            handleSubmitRemove();
        }

        getAllActiveOrders(params);

        setUpdate(prev => !prev);
    }

    const handleSubmitRemove = () => {
        removeItem(keyLocalStorageFilter);
        clearState();
    }

    useEffect(() => {
        let dataFilterParamsLocalStorage = getData(keyLocalStorageFilter);

        if (dataFilterParamsLocalStorage?.city_sync_id) {
            setSelectCities(dataFilterParamsLocalStorage?.city_sync_id);
        }

        if (dataFilterParamsLocalStorage?.kitchen_code) {
            setSelectKitchen(dataFilterParamsLocalStorage?.kitchen_code);
        }
    }, []);

    useEffect(() => {
        let dataFilterLocalStorage = getData(keyLocalStorageFilter);
        let isDisabledBtnSubmit = ((selectKitchen.length == 0 && selectCities.length == 0) && !dataFilterLocalStorage);
        let isDisabledBtnClear = ((selectKitchen.length == 0 && selectCities.length == 0) && !dataFilterLocalStorage);

        setDisabledBtnSubmit(isDisabledBtnSubmit);
        setDisabledBtnClear(isDisabledBtnClear);
    }, [selectCities, selectKitchen, update]);

    return (
        <Wrapper theme={theme} isOpen={isOpen}>
            <Header>
                <div style={{ color: "#fff" }}>Фільтр</div>
                <CloseButton onClick={handleCloseWindow}>
                    <CloseIcon style={{ fontSize: 36 }} />
                </CloseButton>
            </Header>

            <Block>
                <WrIn>
                    <Dropdown
                        title='Місто'
                        type='text'
                        onChange={(e) => setSelectCities(e.target.value)}
                        value={selectCities}
                        list={citiesConvert}
                    />
                </WrIn>
                <WrIn>
                    <Dropdown
                        title='Кухня'
                        type='text'
                        onChange={(e) => setSelectKitchen(e.target.value)}
                        value={selectKitchen}
                        list={kitchensKovert}
                    />
                </WrIn>
            </Block>

            <Menu>
                <Item>
                    <ButtonIcon
                        onClick={handleSubmit}
                        title='Застосувати'
                        icon={<SaveIcon />}
                        disabled={disabledBtnSubmit}
                    />
                </Item>
                <Item>
                    <ButtonIcon
                        onClick={handleSubmitRemove}
                        title='Скинути'
                        icon={<CloseIcon />}
                        disabled={disabledBtnClear}
                    />
                </Item>
            </Menu>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  position: fixed;
  right: ${(p) => (p.isOpen ? "0" : "-1000px")};
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 460px;
  padding-bottom: 30px;
  background-color: ${(p) => p.theme.background};
  transition: 200ms right;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 10px 20px;
  border-bottom: 1px solid ${(p) => p.theme.secondaryColor};
  margin-bottom: 15px;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.accentColor};
  border-radius: 50%;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.backgroundHover};
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  margin-bottom: 40px;
  
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WrIn = styled.div`
  &:not(:first-child) {
      margin-top: 15px;
  }
`;

const Menu = styled.ul`
  position: fixed;
  bottom: 0;
  display: flex;
`;

const Item = styled.li`
  margin: 0 20px 15px 0;
  &:last-child {
    margin-right: 0;
  }
`;


export default EditorCallcenter;
