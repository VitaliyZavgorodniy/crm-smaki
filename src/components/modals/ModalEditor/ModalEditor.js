import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components";


import { resetOrder } from "store/actions/order";
import { orderCreate, orderUpdate, orderReject } from "store/actions/orders";
import { TabDelivery } from "./Tabs/TabDelivery";
import { TabOrder } from "./Tabs/TabOrder";
import { TabPayments } from "./Tabs/TabPayments";
import { TabHistory } from "./Tabs/TabHistory";

import ButtonIcon from "components/ui-kit/ButtonIcon";
import SaveIcon from "@mui/icons-material/Save";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

const EditorCallcenter = ({ isOpen, order, closeEditorCallcenter }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [tab, setTab] = useState(1);

  const handleSubmit = () => {
    if (order.status === "draft" || order.id === "")
      dispatch(orderCreate(order));
    else dispatch(orderUpdate(order));
  };

  const handleCloseOrder = () => {
    dispatch(orderReject(order));
  };

  const handleCloseWindow = () => {
    dispatch(resetOrder());
    closeEditorCallcenter();
  };

  const renderTabList = () => {
    return (
      <TabList>
        <TabItem>
          <TabButton isActive={tab === 1} onClick={() => setTab(1)}>
            Доставка
          </TabButton>
        </TabItem>
        <TabItem>
          <TabButton isActive={tab === 2} onClick={() => setTab(2)}>
            Позиції
          </TabButton>
        </TabItem>
        <TabItem>
          <TabButton isActive={tab === 3} onClick={() => setTab(3)}>
            Оплати
          </TabButton>
        </TabItem>
        <TabItem>
          <TabButton isActive={tab === 4} onClick={() => setTab(4)}>
            Історія
          </TabButton>
        </TabItem>
      </TabList>
    );
  };

  return (
    <Wrapper theme={theme} isOpen={isOpen}>
      <Header>
        <div style={{ color: "#fff" }}>Заказ №{order?.id}</div>

        <CloseButton onClick={handleCloseWindow}>
          <CloseIcon style={{ fontSize: 36 }} />
        </CloseButton>
      </Header>

      {renderTabList()}

      <Block>
        {tab === 2 ? (
          <TabOrder />
        ) : tab === 3 ? (
          <TabPayments />
        ) : tab === 4 ? (
          <TabHistory />
        ) : (
          <TabDelivery />
        )}
      </Block>

      <Menu>
        {order.status === "draft" && (
          <Item>
            <ButtonIcon
              onClick={handleSubmit}
              title='Зберегти'
              icon={<SaveIcon />}
            />
          </Item>
        )}
        {order.status === "new" && (
          <Item>
            <ButtonIcon
              onClick={handleSubmit}
              title='На кухню'
              icon={<ScheduleSendIcon />}
            />
          </Item>
        )}
        <Item>
          <ButtonIcon
            onClick={handleCloseOrder}
            title='Скасувати'
            icon={<CancelIcon />}
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

const TabList = styled.ul`
  display: flex;
  width: 100%;
  padding-right: 5px;
  border-bottom: 1px solid ${(p) => p.theme.lightAccentColor};
`;

const TabItem = styled.li`
  margin: 0;
`;

const TabButton = styled.button`
  padding: 8px 15px;
  background-color: ${(p) =>
    p.isActive ? p.theme.backgroundActive : "transparent"};
  border-bottom: 4px solid
    ${(p) => (p.isActive ? p.theme.accentColor : "transparent")};
  border-radius: 10px 10px 0 0;
  color: ${(p) => (p.isActive ? p.theme.accentColor : p.theme.secondaryColor)};
  font-family: Rubik, sans-serif;
  font-size: 16px;
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.backgroundHover};
    color: ${(p) => p.theme.accentColor};
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
