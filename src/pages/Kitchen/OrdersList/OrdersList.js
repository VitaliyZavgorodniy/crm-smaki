import React, { useState } from "react";
import styled from "styled-components";

// import { citySearch } from "utils/mappers/cities";
// import { kitchenSearch } from "utils/mappers/kitchens";

const OrdersList = ({
  data,
  title,
  openEditorCallcenter,
  updateOrder,
  // cities,
  // kitchens
}) => {
  const [isExpand, setExpand] = useState(true);

  const handleOpenEditor = (item) => {
    updateOrder(item);
    openEditorCallcenter(item);
  };

  const renderHeader = () => {
    return (
      <Row>
        <Cell style={{ width: "70px" }}>Заказ</Cell>
        <Cell style={{ width: "15%" }}>Кухня</Cell>
        <Cell style={{ width: "100px" }}>Город</Cell>
        <Cell style={{ width: "40%" }}>Адрес</Cell>
        <Cell style={{ width: "15%" }}>Клиент</Cell>
        <Cell style={{ width: "120px" }}>Телефон</Cell>
      </Row>
    );
  };

  const renderBody = () => {
    return data.map((item, index) => {
      // console.log(item.items);

      // let city = citySearch(item.address.city_sync_id, cities);
      // let kitchen = kitchenSearch(item.kitchen_code, kitchens);

      return (
        <Row key={index} onClick={() => handleOpenEditor(item)}>
          <Cell style={{ width: "70px" }}>{item.id}</Cell>
          <Cell style={{ width: "15%" }}>{item.kitchen_code}</Cell>
          <Cell style={{ width: "100px" }}>{item.address.city_sync_id}</Cell>
          <Cell
            style={{ width: "40%" }}
          >{`${item.address.street}, ${item.address.house_number}, кв. ${item.address.floor}`}</Cell>
          <Cell style={{ width: "15%" }}>{item.client.name}</Cell>
          <Cell style={{ width: "120px" }}>
            <Phone href={`tel:+${item.client.phone}`}>
              +{item.client.phone}
            </Phone>
          </Cell>
        </Row>
      );
    });
  };

  return (
    <Wrapper>
      <Title onClick={() => setExpand(!isExpand)}>{title}</Title>

      {data.length ? (
        <Table isExpand={isExpand}>
          {renderHeader()}
          {renderBody()}
        </Table>
      ) : (
        <NoData>Нет заказов в текущем статусе</NoData>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 25px;
  padding: 20px;
  margin: 15px 0;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0px 0px 1px #e6e6e6;
`;

const Table = styled.ul`
  display: ${(p) => (p.isExpand ? "table" : "none")};
  width: 100%;
  margin-top: 30px;
  /* border-collapse: collapse; */
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 2px solid #f6f5fa;
  border-bottom: none;

  &:hover {
    cursor: pointer;
    background-color: #f2f4ff;
  }

  &:first-child {
    font-weight: 700;
    background-color: #f6f5fa;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  &:last-child {
    border-bottom: 2px solid #f6f5fa;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const Cell = styled.div`
  display: flex;
  padding: 0 5px 0 15px;
`;

const NoData = styled.p`
  color: #9d9d9d;
  text-align: center;
  margin-top: 20px;
`;

const Phone = styled.a``;

const Title = styled.h3`
  display: flex;
  align-items: center;
  color: #262836;
  font-weight: 400;
  font-size: 24px;
  padding: 0px;
  border-radius: 5px;
  transition: 200ms background-color;
  &:hover {
    cursor: pointer;
    color: #5f76f8;
  }
`;

export default React.memo(OrdersList);
