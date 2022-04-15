import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getOrderItems } from "store/actions/orders";

import ButtonIcon from "components/ui-kit/ButtonIcon";
import AddIcon from "@mui/icons-material/Add";

import ModalEditor from "components/modals/ModalEditor";
import OrdersList from "./OrdersList/index";

const KitchenPage = ({
  orders,
  updateOrder,
  openEditorCallcenter,
  getAllActiveOrders,
}) => {
  const dispatch = useDispatch();
  // const list = useSelector((store) => store.listings.ordersKitchen);

  // useEffect(() => {
  //   getAllActiveOrders();
  //   dispatch(getOrderItems());

  //   const interval = setInterval(() => {
  //     getAllActiveOrders();
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleCreateOrder = () => {
    updateOrder();
    openEditorCallcenter();
  };

  const renderOrders = () => {
    return (
      <>
        <OrdersList data={orders.cooking} title='Готовятся' />
        <OrdersList data={orders.preparing} title='Пакуется' />
        <OrdersList data={orders.for_delivery} title='Доставляется' />
      </>
    );
  };

  return (
    <Wrapper>
      {orders && renderOrders()}
      <ButtonWrapper>
        <ButtonIcon
          onClick={handleCreateOrder}
          title='Нове Замовлення'
          icon={<AddIcon />}
        />
      </ButtonWrapper>
      <ModalEditor />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5px;
  padding-bottom: 80px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 20px;
  right: 30px;
`;

export default React.memo(KitchenPage);
