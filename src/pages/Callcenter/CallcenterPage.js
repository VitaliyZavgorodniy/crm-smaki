import React, { useEffect } from "react";
import styled from "styled-components";

import ButtonIcon from "components/ui-kit/ButtonIcon";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import ModalEditor from "components/modals/ModalEditor";
import OrdersList from "./OrdersList/index";
import ModalFilter from "components/modals/ModalFilter";
import { getFiltet } from "utils/processingRequester/getLocalFilterOrders";

const CallcenterPage = ({
  orders,
  updateOrder,
  openEditorCallcenter,
  getAllActiveOrders,
  openModalFilter,
}) => {
  useEffect(() => {
    getAllActiveOrders(getFiltet());

    const interval = setInterval(() => {
      getAllActiveOrders(getFiltet());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateOrder = () => {
    updateOrder();
    openEditorCallcenter();
  };

  const handleShowFilter = () => {
    openModalFilter();
  }

  const renderOrders = () => {
    return (
      <>
        <OrdersList data={orders.new} title='Нові замовлення' />
        <OrdersList data={orders.cooking} title='Готуються' />
        <OrdersList data={orders.preparing} title='Пакуються' />
        <OrdersList data={orders.for_delivery} title='Доставляються' />
        <OrdersList data={orders.pending} title='Попереднi замовлення' />
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
        <WrBtn>
          <ButtonIcon
            onClick={handleShowFilter}
            title='Фільтр'
            icon={<FilterAltIcon />}
            colorBg="#9D9D9D"
          />
        </WrBtn>
      </ButtonWrapper>
      <ModalEditor />
      <ModalFilter />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 80px;
`;

const WrBtn = styled.div`
  margin-top: 10px;
  button {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 20px;
  right: 30px;
`;

export default React.memo(CallcenterPage);
