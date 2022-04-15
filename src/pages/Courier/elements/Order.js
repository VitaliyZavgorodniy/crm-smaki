import React from "react";
import styled from "styled-components";
import moment from "moment";

import { Restaurant } from "./Restaurant";

import CloseIcon from "@mui/icons-material/Close";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorIcon from "@mui/icons-material/Error";
import MopedIcon from "@mui/icons-material/Moped";
import MapIcon from "@mui/icons-material/Map";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";

export const Order = ({
  onDelivery,
  closeModalWindow,
  handleCompleteDelivery,
  data,
  isFetching,
}) => {
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

  const renderOrderItems = () => {
    return data.items.map((item, index) => {
      return (
        <Item key={index}>
          <span>{item.name}</span>
          <span>{item.amount} шт.</span>
        </Item>
      );
    });
  };

  return (
    <Wrapper>
      <Header>
        <ButtonClose onClick={() => closeModalWindow()}>
          <CloseIcon sx={{ fontSize: 32 }} style={{ color: "#f79f21" }} />
        </ButtonClose>
        <Text>№ {data.order_id}</Text>
      </Header>

      <Body>
        <Title>Час замовлення</Title>
        <Row>
          <Restaurant data={data.restaurant} />
          <Timer>
            {renderIconStatus(data.status)}
            {moment(data.expected_delivery_at).format("HH:mm")}
            <span>{calculateDifference(data.expected_delivery_at)}</span>
          </Timer>
        </Row>

        <Title>Адреса</Title>
        <RowLink
          target='_blank'
          href={`https://www.google.com/maps/place/${data.address.city}+${data.address.street}+${data.address.home}`}
        >
          <Info>
            Місто: {data.address.city}, вулиця: {data.address.street}, будинок{" "}
            {data.address.home}, квартира {data.address.housing}, під'їзд:{" "}
            {data.address.entrance}, поверх:
            {data.address.floor}
          </Info>

          <IconWrapper>
            <MapIcon sx={{ fontSize: 32 }} style={{ color: "#fff" }} />
          </IconWrapper>
        </RowLink>

        <Title>Оплата</Title>
        <Row>
          <PaymentType>
            <MonetizationOnIcon style={{ color: "#f79f21", marginRight: 4 }} />
            {data.payment.title}
          </PaymentType>

          <PaymentSum>
            <Sum>{data.payment.sum}</Sum>
          </PaymentSum>
        </Row>

        <Title>Контакти</Title>
        <RowLink href={`tel:${data.customer.phone}`}>
          <Info>
            <Phone>{data.customer.phone}</Phone>
            <Name>{data.customer.name}</Name>
          </Info>

          <IconWrapper>
            <PhoneForwardedIcon
              sx={{ fontSize: 32 }}
              style={{ color: "#fff" }}
            />
          </IconWrapper>
        </RowLink>

        {onDelivery && (
          <Button
            onClick={() =>
              handleCompleteDelivery(data.order_uuid, data.restaurant)
            }
            disabled={isFetching}
          >
            Закрити замовлення
          </Button>
        )}

        <Title>Склад замовлення</Title>
        <List>{renderOrderItems()}</List>

        <Title>Коментар</Title>
        <Row>{data.comment}</Row>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0px 0px 5px #eee;
`;

const Body = styled.section`
  padding: 15px 10px;
  /* height: 100%; */
`;

const Title = styled.h3`
  font-weight: 400;
`;

const Info = styled.div`
  color: #444444;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }
`;
const RowLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }
`;
const Text = styled.div`
  font-size: 18px;
`;

const Name = styled.div`
  padding: 3px 0;
`;

const Phone = styled.div`
  padding: 3px 0;
  font-size: 20px;
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

const List = styled.ul`
  margin-top: 10px;
  margin-bottom: 25px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  /* width: 50px;
  height: 50px; */
  border-radius: 10px;
  background-color: #f79f21;
  /* margin-left: 20px; */
`;

const Button = styled.button`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f79f21;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const ButtonClose = styled.button`
  background-color: transparent;
`;
