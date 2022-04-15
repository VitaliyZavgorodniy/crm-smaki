import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  updateOrderPayments,
  addOrderPayments,
  removeOrderPayments,
} from "store/actions/order";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const paymentTypes = [
  { type: "cash", title: "Готівка" },
  { type: "card", title: "Карта" },
  { type: "online", title: "Онлайн" },
  { type: "bonus", title: "Бонуси" },
];

export const PaymentsTable = () => {
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);

  const payments = useSelector((state) => state.order.data.payments);
  const items = useSelector((store) => store.order.data.items);

  const handleAdded = (type) => {
    dispatch(
      addOrderPayments(type, calculateSumItems() - calculateSumPayments())
    );
    setOpen(false);
  };

  const renderList = () => {
    return payments.map((item, index) => {
      return (
        <Row key={index}>
          <Cell>
            <Button
              onClick={() => dispatch(removeOrderPayments(item.payment_type))}
            >
              <RemoveCircleOutlineIcon style={{ height: 18, width: 18 }} />
            </Button>
            {item.payment_type}
          </Cell>

          <Cell>
            <Input
              type='number'
              value={item.sum}
              onChange={(e) =>
                dispatch(updateOrderPayments(item.payment_type, e.target.value))
              }
            />
          </Cell>
        </Row>
      );
    });
  };

  const renderAddPayment = () => {
    return paymentTypes.map((item, index) => {
      return (
        <Item key={index} onClick={() => handleAdded(item.type)}>
          {item.title}
        </Item>
      );
    });
  };

  const calculateSumItems = () => {
    return items.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0);
  };

  const calculateSumPayments = () => {
    return payments.reduce((a, b) => {
      return parseInt(a) + parseInt(b.sum);
    }, 0);
  };

  return (
    <Wrapper>
      <Table>
        <Header>
          <Label>Тип оплати</Label>
          <Label>Сума</Label>
        </Header>

        {payments.length > 0 && renderList()}

        <Row>
          <Cell>Сплачено:</Cell>
          <Cell>{payments?.length > 0 && calculateSumPayments()}</Cell>
        </Row>

        <Row>
          <Cell>До сплати:</Cell>
          <Cell>{items?.length > 0 && calculateSumItems()}</Cell>
        </Row>
      </Table>

      <ButtonAdd onClick={() => setOpen(!isOpen)}>Додати оплату +</ButtonAdd>
      <List isOpen={isOpen}>{renderAddPayment()}</List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin: 10px 3px;
  border-radius: 10px;
  background-color: #fff;
  border: 2px solid #cdc9c3;
  box-shadow: 0px 0px 1px #e6e6e6;
`;

const Table = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e6e6e6;
  border-radius: 8px 8px 0 0;
  /* padding: 0 5px; */
`;

const Body = styled.tbody``;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cdc9c3;
`;

const Label = styled.div`
  border-left: 1px solid #cdc9c3;
  padding: 8px 15px;

  &:last-child {
    width: 100px;
  }

  &:first-child {
    border-left: none;
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  border-left: 1px solid #cdc9c3;

  &:first-child {
    border-left: none;
  }

  &:last-child {
    width: 100px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin-right: 5px;
  padding: 0;
  background-color: transparent;
  color: #262836;

  &:hover {
    cursor: pointer;
    color: #5f76f8;
  }
`;

const ButtonAdd = styled.button`
  padding: 4px;
  margin: 5px;
  color: #5f76f8;
  border-radius: 10px;
  background-color: "transparent";
  font-size: 16px;
  font-family: Rubik;

  &:hover {
    cursor: pointer;
    background-color: #fff;
  }
`;

const List = styled.ul`
  position: absolute;
  bottom: 33px;
  left: 8px;
  z-index: 2;
  display: ${(p) => (p.isOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  padding: 5px;
  border-radius: 10px;
  border: 2px solid #cdc9c3;
`;

const Item = styled.li`
  padding: 1px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0px;
  }
  &:hover {
    cursor: pointer;
    color: #5f76f8;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
`;
