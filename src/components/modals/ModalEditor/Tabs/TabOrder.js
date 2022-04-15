import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";

import {
  removeOrderItem,
  increaseOrderItem,
  decreaseOrderItem,
  updateOrderItemComment,
} from "store/actions/order";

import { TabProducts } from "./TabProducts";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

import { IconButton } from "components/ui-kit/buttons/IconButton";
import { TextArea } from "components/ui-kit/inputs/TextArea";

export const TabOrder = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const products = useSelector((state) => state.order.data.items);
  const city = useSelector((state) => state.order.data.address.city_sync_id);

  const renderItemList = () => {
    return products.map((item, index) => {
      const { price } = item.prices
        ? item.prices.find((el) => el.city_sync_id === city)
        : item;
      return (
        <Item key={index}>
          <Title>{item.title}</Title>

          <Text>Артикул: {item.article}</Text>
          <Text>Цена: {parseInt(price)} грн.</Text>

          <Quantity>
            <ButtonBar>
              <div>Кількість: {item.quantity} шт.</div>

              <IconButton
                icon={<AddIcon />}
                onClick={() => dispatch(increaseOrderItem(item.id))}
              />

              <IconButton
                icon={<RemoveIcon />}
                onClick={() => dispatch(decreaseOrderItem(item.id))}
              />
            </ButtonBar>

            <div>Итого: {item.quantity * item.price} грн.</div>
          </Quantity>

          <TextArea
            title='Коментар'
            onChange={(e) =>
              dispatch(updateOrderItemComment(item.id, e.target.value))
            }
            value={item.comment}
          />

          <Subtext>ID: {item.id}</Subtext>

          <ButtonHolder>
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => dispatch(removeOrderItem(item))}
            />
          </ButtonHolder>

          {!item.prices && (
            <Warning>
              <WarningIcon />
            </Warning>
          )}
        </Item>
      );
    });
  };

  return (
    <Wrapper theme={theme}>
      <List>
        {products.length > 0 ? (
          renderItemList()
        ) : (
          <Subtext>Немає позицій</Subtext>
        )}
      </List>

      <TabProducts />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.ul``;

const Item = styled.li`
  position: relative;
  margin: 5px 5px 8px 5px;
  padding: 10px;
  background-color: ${(p) => p.theme.backgroundLight};
  border: ${(p) => p.theme.inputBorder};
  border-radius: 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 10px;
  color: ${(p) => p.theme.accentColor};
`;

const Quantity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px 0;
  border-top: ${(p) => p.theme.inputBorder};
  border-bottom: ${(p) => p.theme.inputBorder};
  color: ${(p) => p.theme.secondaryColor};
`;

const ButtonBar = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonHolder = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Text = styled.div`
  margin-bottom: 5px;
  color: ${(p) => p.theme.secondaryColor};
`;

const Subtext = styled.div`
  margin-top: 10px;
  padding-top: 5px;
  font-size: 12px;
  border-top: ${(p) => p.theme.inputBorder};
  color: ${(p) => p.theme.lightAccentColor};
`;

const Warning = styled.div`
  position: absolute;
  right: 10px;
  bottom: 2px;
  color: #f90716;
`;
