import { isArray } from "lodash";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

const RenderHistoryItem = ({ data }) => {
  const [show, setShow] = useState(false);
  const [showDish, setShowDish] = useState(false);

  return (
    <HistoryItem>
      <HistoryItemHeader>
        <HistoryItemHeaderLeft>
          <RowItem>
            <RowItemLabel>Номер заказа: </RowItemLabel> 22
          </RowItem>
          <RowItem>
            <RowItemLabel>Дата заказа: </RowItemLabel> 22.09.22 18:00:00
          </RowItem>
        </HistoryItemHeaderLeft>
        <HistoryItemHeaderIcon
          onClick={() => { setShow(!show) }}
          show={show}
        >
          <ArrowDropDown />
        </HistoryItemHeaderIcon>
      </HistoryItemHeader>
      {
        show && (
          <HistoryItemContent>
            <RowTitle onClick={() => { setShowDish(!showDish) }}>
              <Title>Блюда:</Title>
              <IconDropDownDish
                show={showDish}
              >
                <ArrowDropDown />
              </IconDropDownDish>
            </RowTitle>
            {
              showDish && (
                <Dish>
                  <DishItem>
                    <RowItem>
                      <RowItemLabel>Названия: </RowItemLabel> Пицца с ветчиной и грибами.
                    </RowItem>
                    <RowItem>
                      <RowItemLabel>Количество: </RowItemLabel> 2 шт.
                    </RowItem>
                    <RowItem>
                      <RowItemLabel>Цена: </RowItemLabel> 20 грн.
                    </RowItem>
                  </DishItem>
                  <DishItem>
                    <RowItem>
                      <RowItemLabel>Названия: </RowItemLabel> Пицца с ветчиной и грибами.
                    </RowItem>
                    <RowItem>
                      <RowItemLabel>Количество: </RowItemLabel> 2 шт.
                    </RowItem>
                    <RowItem>
                      <RowItemLabel>Цена: </RowItemLabel> 20 грн.
                    </RowItem>
                  </DishItem>
                  <DishItem>
                    <RowItem>
                      <RowItemLabel>Названия: </RowItemLabel> Пицца с ветчиной и грибами.
                    </RowItem>
                    <RowItem>
                      <RowItemLabel>Количество: </RowItemLabel> 2 шт.
                    </RowItem>
                    <RowItem>
                      <RowItemLabel>Цена: </RowItemLabel> 20 грн.
                    </RowItem>
                  </DishItem>
                </Dish>
              )
            }
            <RowItem>
              <RowItemLabel>Статус заказа: </RowItemLabel>
              {
                true ? <Status status={true}>выполнен</Status> : <Status status={false}>отменен</Status>
              }
            </RowItem>
            <RowItem>
              <RowItemLabel>Адрес доставки: </RowItemLabel> Львів Данила Галицького 22
            </RowItem>
            <Title>Способ оплаты:</Title>
            <RowItem>
              <RowItemLabel>Сдача: </RowItemLabel> 225 грн.
            </RowItem>
            <RowItem>
              <RowItemLabel>Бонусы: </RowItemLabel> 21
            </RowItem>
            <RowItem>
              <RowItemLabel>Промокоды: </RowItemLabel> sa2asdasd
            </RowItem>
            <Title>Сотрудники:</Title>
            <RowItem>
              <RowItemLabel>Курьер: </RowItemLabel> text
            </RowItem>
            <RowItem>
              <RowItemLabel>Оператор который занимался заказом: </RowItemLabel> text
            </RowItem>
          </HistoryItemContent>
        )
      }
    </HistoryItem>
  )
}

const RenderHistory = ({ objHisrory }) => {
  return (
    isArray(objHisrory) && objHisrory.map((itemHistory, index) => (
      <RenderHistoryItem
        key={index}
        data={itemHistory}
      />
    ))
  )
}

export const TabHistory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Wrapper theme={theme}>
      <ListHistory>
        <RenderHistory objHisrory={[1, 2, 3, 4, 5, 6, 7, 7, 8]} />
      </ListHistory>
    </Wrapper>
  )
};

const Wrapper = styled.div`
`;

const ListHistory = styled.ul`
`;

const HistoryItem = styled.li`
  padding: 7px;
  background-color: #2D303E;
  border: 2px solid #393C49;
  border-radius: 10px;
  color: #FFF;  
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const HistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HistoryItemHeaderLeft = styled.div`
  margin-right: 20px;
`;

const HistoryItemHeaderIcon = styled.span`
  min-width: 30px;
  width: 30px;
  height: 30px;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.show ? "#EDA240" : "#fff"};
  transform: rotate(${(p) => p.show ? "180deg" : "0deg"});
  &:hover {
    color: ${(p) => p.theme.accentColor};
  }
`;

const HistoryItemContent = styled.div`
`;

const RowItem = styled.div`
`;

const RowItemLabel = styled.span`
  padding-right: 10px;
  font-weight: 500;
  color: ${(p) => p.theme.accentColor};
`;
const Status = styled.span`
  color: ${(p) => p.status ? "green" : "red"};
`;

const RowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 10px 15px 10px 0;
`;

const IconDropDownDish = styled.span`
  min-width: 30px;
  width: 30px;
  height: 30px;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.show ? "#EDA240" : "#fff"};
  transform: rotate(${(p) => p.show ? "180deg" : "0deg"});
  margin-right: 20px;
  &:hover {
    color: ${(p) => p.theme.accentColor};
  }
`;

const Dish = styled.ul`
`;

const DishItem = styled.li`
  padding-bottom: 10px;
  border-bottom: 1px solid #fff;
  &:not(:first-child) {
    padding-top: 10px;
  }
  &:last-child {
    margin-bottom: 10px;
  }
`;