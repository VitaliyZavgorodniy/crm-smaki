import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components";
import moment from "moment";

import { getCouriersOrders } from "store/actions/listings";
import { startDelivery, completeDelivery } from "store/actions/orders";
import { getUser } from "store/actions/user";
import { logout } from "store/actions/session";

import { Restaurant } from "./elements/Restaurant";
import { Order } from "./elements/Order";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorIcon from "@mui/icons-material/Error";
import MopedIcon from "@mui/icons-material/Moped";
import LogoutIcon from "@mui/icons-material/Logout";

const Courier = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isFetching, setFetching] = useState(false);

  const orders = useSelector((store) => store.listings?.ordersCourier);
  const status = useSelector((store) => store.user.user.iiko.status);

  useEffect(() => {
    dispatch(getCouriersOrders());

    const interval = setInterval(() => {
      dispatch(getCouriersOrders());
      dispatch(getUser());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const openModalWindow = async (order) => {
    await setActiveOrder(order);
    setOpen(true);
  };

  const closeModalWindow = async (order) => {
    setOpen(false);
  };

  const handleStartDelivery = async () => {
    await dispatch(startDelivery(orders[0].delivery_terminal_id, orders));
    await dispatch(getUser());
    await dispatch(getCouriersOrders());
  };

  const handleCompleteDelivery = async (id, restaurant) => {
    await setFetching(true);
    // handleCompleteDelivery(item.order_uuid, item.restaurant)
    const params = {
      restaurant,
    };

    await dispatch(completeDelivery(id, params));
    await dispatch(getCouriersOrders());
    setOpen(false);
    await setFetching(false);
  };

  const calculateDifference = (expected) => {
    const a = moment(expected);
    const b = moment();

    const difference = b.diff(a, "minutes");

    if (difference > 0) return `(+${difference} хв.)`;
    return null;
  };

  const renderIconStatus = (status) => {
    if (status === "waiting")
      return <HourglassEmptyIcon style={{ color: "#f79f21" }} />;
    else if (status) return <MopedIcon style={{ color: "#6ECB63" }} />;
    else return <ErrorIcon style={{ color: "#FF2626" }} />;
  };

  const renderOrdersList = () => {
    return orders.map((item, index) => {
      return (
        <Item key={index} onClick={() => openModalWindow(item)}>
          <Row>
            <Restaurant data={item.restaurant} />

            <Timer>
              {renderIconStatus(item.status)}
              {moment(item.expected_delivery_at).format("HH:mm")}
              <span>{calculateDifference(item.expected_delivery_at)}</span>
            </Timer>
          </Row>
          <Row>
            <Text>
              {item.address.city} {item.address.street} {item.address.home}
              {item.address.housing}
            </Text>
          </Row>
          <Row>
            <PaymentType>
              <MonetizationOnIcon
                style={{ color: "#f79f21", marginRight: 4 }}
              />
              {item.payment.title}
            </PaymentType>

            <PaymentSum>
              <Sum>{item.payment.sum}</Sum>
            </PaymentSum>
          </Row>
        </Item>
      );
    });
  };

  return (
    <Wrapper>
      {isOpen && (
        <Order
          onDelivery={status === "on_delivery"}
          closeModalWindow={closeModalWindow}
          handleCompleteDelivery={handleCompleteDelivery}
          data={activeOrder}
          isFetching={isFetching}
        />
      )}
      <Header>
        <button
          onClick={() => dispatch(logout())}
          style={{ backgroundColor: "transparent" }}
        >
          <LogoutIcon
            style={{ color: "#f79f21", transform: "rotate(180deg)" }}
          />
        </button>
      </Header>
      <Body>
        {!!orders && orders.length > 0 ? (
          renderOrdersList()
        ) : (
          <Warning>Очікування замовлення</Warning>
        )}
      </Body>

      {status === "waiting" && orders.length > 0 && (
        <ButtonStart onClick={() => handleStartDelivery()}>Поїхали</ButtonStart>
      )}

      {/* <ButtonStart onClick={() => handleStartDelivery()}>Поїхали</ButtonStart> */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  max-width: 425px;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: #f7f7f7;
  padding-bottom: 60px;
`;

const Header = styled.header`
  height: 50px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0px 0px 5px #eee;
`;

const Body = styled.section`
  padding: 15px 10px;
  /* height: 100%; */
`;

const Item = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 5px #eee;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }
`;

const Warning = styled.div`
  margin-top: 20px;
  color: #6d8299;
  text-align: center;
`;

const Text = styled.div`
  font-size: 18px;
`;

const PaymentType = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const PaymentSum = styled.span`
  & span {
  }
`;

const Sum = styled.span`
  font-weight: 600;
  color: #f79f21;
  &::after {
    content: " грн.";
    color: #262836;
    font-size: 14px;
    font-weight: 400;
  }
`;

const Timer = styled.span`
  display: flex;
  align-items: center;

  & span {
    margin-left: 4px;
    color: #ff0000;
  }
`;

const ButtonStart = styled.button`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 20px 15px;
  border-radius: 15px 15px 0 0;
  background-color: #f79f21;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

export default React.memo(Courier);
