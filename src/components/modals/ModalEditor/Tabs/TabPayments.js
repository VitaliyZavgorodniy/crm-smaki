import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  updateOrderData,
  updateOrderClient,
  updateOrderAddress,
} from "store/actions/order";

import { PaymentsTable } from "../elements/PaymentsTable";

import Input from "components/ui-kit/Modals/Input";

export const TabPayments = () => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order.data);

  return (
    <Wrapper>
      <PaymentsTable />

      <Input
        title='Решта з'
        type='text'
        onChange={(e) =>
          dispatch(updateOrderData("change_from", e.target.value))
        }
        value={order.change_from}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
