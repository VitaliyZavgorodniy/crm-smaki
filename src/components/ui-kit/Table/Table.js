import React from "react";
import styled, { useTheme } from "styled-components";

const Table = ({ scheme, data, onClick }) => {
  const theme = useTheme();

  const renderHeader = () => {
    const HTMLelement = scheme.map((item, index) => {
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
    const renderCells = (item) =>
      scheme.map((cell, index) => {
        if (cell.type === "list")
          return (
            <Cell key={index}>{renderList(item[cell.key], cell.items)}</Cell>
          );
        else if (item[cell.key])
          return <Cell key={index}>{item[cell.key]}</Cell>;
        else return <Cell key={index}></Cell>;
      });

    const HTMLelement = data.map((item, index) => {
      return (
        <Row key={index} onClick={onClick ? () => onClick(item) : null}>
          {renderCells(item)}
        </Row>
      );
    });

    return HTMLelement;
  };

  const renderList = (list, items) => {
    // console.log(scheme);
    // console.log(list[0][scheme.keys[0]]);
    const HTMLelement = list.map((item, index) => {
      return (
        <Item key={index}>
          {item[items[0]]} {item[items[1]]}
        </Item>
      );
    });
    return <List>{HTMLelement}</List>;
  };

  return (
    <>
      {!!data && data.length ? (
        <Wrapper theme={theme}>
          <Thead>{renderHeader()}</Thead>
          <Tbody>{renderBody()}</Tbody>
        </Wrapper>
      ) : null}
    </>
  );
};

const Wrapper = styled.table`
  display: table;
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

const List = styled.ul``;

const Item = styled.li``;

export default React.memo(Table);
