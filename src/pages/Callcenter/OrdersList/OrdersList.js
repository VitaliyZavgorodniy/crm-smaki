import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { tableCallCenter } from "constants/tables";
import iconSmaki from "assets/icons/smaki.png";
import iconGo from "assets/icons/go.png";


const OrdersList = ({
  data,
  title,
  openEditorCallcenter,
  updateOrder,
}) => {
  const theme = useTheme();

  const [isExpand, setExpand] = useState(true);

  const handleOpenEditor = (item) => {
    updateOrder(item);
    openEditorCallcenter(item);
  };

  const renderIcon = (value) => {
    if (value === "smaki") return iconSmaki;
    else if (value === "go") return iconGo;
    else return "Restaurant";
  };

  const renderHeader = () => {
    const HTMLelement = tableCallCenter.map((item, index) => {
      const { title, width } = item;

      return (
        <HeadCell key={index} style={{ width }}>
          {title}
        </HeadCell>
      );
    });

    return <HeadRow>{HTMLelement}</HeadRow>;
  };

  const renderBody = () => {
    return data.map((item, index) => {
      return (
        <Row key={index} onClick={() => handleOpenEditor(item)}>
          <Cell><Status color={item.time_flags.class}>{item.time_flags.time}</Status></Cell>
          <Cell>{<Icon src={renderIcon(item.restaurant)} />}</Cell>
          <Cell>{item.id}</Cell>
          <Cell>{item.kitchen.title}</Cell>
          <Cell>{item.address.city.name}</Cell>
          <Cell>{`${item.address.street}, ${item.address.house_number}, кв. ${item.address.floor}`}</Cell>
          <Cell>{item.client.name}</Cell>
          <Cell>{item.client.phone}</Cell>
        </Row>
      );
    });
  };

  return (
    <Wrapper theme={theme}>
      <Title onClick={() => setExpand(!isExpand)} isExpand={isExpand}>
        {title}
        <span>
          <ArrowDownwardIcon />
        </span>
      </Title>

      {data.length ? (
        <Table isExpand={isExpand}>
          <Thead>{renderHeader()}</Thead>
          <Tbody>{renderBody()}</Tbody>
        </Table>
      ) : (
        <Text>Немає замовлень у цьому статусі</Text>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  border: ${(p) => p.theme.shadowBorder};
  box-shadow: ${(p) => p.theme.shadow};
`;

const Title = styled.h3`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  color: ${(p) => p.theme.primaryColor};
  font-weight: 400;
  font-size: 24px;
  transition: color 400ms ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${(p) => p.theme.accentColor};
  }

  & span {
    position: absolute;
    /* top: 50%; */
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(${(p) => (p.isExpand ? "0deg" : "180deg")});
    transition: transform 200ms ease-in-out;
  }

  &:hover span {
    color: ${(p) => p.theme.accentColor};
  }
`;

const Text = styled.p`
  text-align: center;
  color: ${(p) => p.theme.lightAccentColor};
`;

const Icon = styled.img`
  height: 25px;
`;

const Table = styled.table`
  display: ${(p) => (p.isExpand ? "table" : "none")};
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const HeadRow = styled.tr``;

const Row = styled.tr`
  &:hover {
    cursor: pointer;
    color: ${(p) => p.theme.accentColor};
    background-color: ${(p) => p.theme.maskColor};
  }
`;

const HeadCell = styled.th`
  padding: 3px;
  background-color: ${(p) => p.theme.lightAccentColor};
  border: 2px solid ${(p) => p.theme.lightAccentColor};
  color: ${(p) => p.theme.secondaryColor};
  font-weight: 400;
`;

const Cell = styled.td`
  padding: 5px;
  border: 2px solid ${(p) => p.theme.maskColor};
`;

const Status = styled.span`
  padding: 5px 15px;
  background: ${(p) => p.color};
  border-radius: 5px;
`;

export default React.memo(OrdersList);
