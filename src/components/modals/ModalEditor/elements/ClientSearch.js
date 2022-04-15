import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getClients } from "store/actions/clients";
import { updateOrderClient } from "store/actions/order";

import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";

import Input from "components/ui-kit/Modals/Input";
import InputDropdown from "components/ui-kit/Modals/InputDropdown";
import InputPhone from "components/ui-kit/Modals/InputPhone";

const source = ["website", "website", "website", "website", "website"];

export const ClientSearch = () => {
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.clients.list);
  const client = useSelector((state) => state.order.data.client);
  // const source = useSelector(store=>store.settings.clientSources) REWORK

  const [phoneNumber, setPhoneNumber] = useState("380");
  const [mode, setMode] = useState("search");

  useEffect(() => {
    if (!!client.id) setMode("preview");
    else if (mode === "preview") setMode("search");
  }, [client]);

  const handleSearch = (number) => {
    if (number.length > 3) dispatch(getClients(number));
    setPhoneNumber(number);
  };

  const handleClient = (data) => {
    dispatch(updateOrderClient(null, data));
    setMode(false);
  };

  const handleNewClient = () => {
    setMode("create");
    dispatch(updateOrderClient("id", null));
  };

  const renderPreview = () => {
    return (
      <Wrapper mode='fill'>
        <Title mode='fill'>Клієнт</Title>
        <Block>
          <Phone href={`tel:+${client.phone}`}>
            +{client.phone}
            <PhoneInTalkRoundedIcon style={{ marginLeft: 5 }} />
          </Phone>
          <Name>
            {client.name} (ID{client.id})
          </Name>

          <FloatButton mode='fill' onClick={() => setMode("search")}>
            <CloseIcon />
          </FloatButton>
        </Block>
      </Wrapper>
    );
  };

  const renderCreate = () => {
    return (
      <Wrapper>
        <Title>Новий клієнт</Title>
        <Block>
          <Input
            title="Ім'я"
            type='text'
            value={client.name}
            onChange={(e) =>
              dispatch(updateOrderClient("name", e.target.value))
            }
          />
          <Row>
            <InputPhone
              title='Номер телефону'
              type='text'
              value={client.phone}
              onChange={(value) => dispatch(updateOrderClient("phone", value))}
            />
            <InputDropdown
              title='Джерело'
              type='text'
              list={source}
              value={client.source}
              onChange={(e) =>
                dispatch(updateOrderClient("source", e.target.value))
              }
            />
          </Row>

          <FloatButton onClick={() => setMode("search")}>
            <CloseIcon />
          </FloatButton>
        </Block>
      </Wrapper>
    );
  };

  const renderSearch = () => {
    return (
      <Wrapper style={{ position: "relative" }}>
        <Title>Пошук клієнта</Title>
        <Block>
          <InputPhone
            // width='100%'
            type='text'
            value={phoneNumber}
            onChange={handleSearch}
          />

          {phoneNumber.length >= 4 && clients.length >= 0 && (
            <Prediction>
              {renderPrediction()}
              <PredictionItem
                onClick={handleNewClient}
                style={{ color: "#EDA240" }}
              >
                Новий клієнт +
              </PredictionItem>
            </Prediction>
          )}
        </Block>
      </Wrapper>
    );
  };

  const renderPrediction = () => {
    return clients.map((item, index) => {
      return (
        <PredictionItem key={index} onClick={() => handleClient(item)}>
          <Text>+{item.phone}</Text>
          <SubText>{item.name}</SubText>
        </PredictionItem>
      );
    });
  };

  if (mode === "preview") return renderPreview();
  else if (mode === "create") return renderCreate();
  else return renderSearch();
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  margin: 15px 4px;
  background-color: ${(p) =>
    p.mode === "fill" ? p.theme.accentColor : p.theme.background};
  border: 2px solid ${(p) => p.theme.accentColor};
`;

const Title = styled.div`
  font-size: 18px;
  margin: 0px 6px 10px 6px;
  color: ${(p) => p.theme.secondaryColor};
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.div`
  margin-left: 6px;
  margin-top: 4px;
  color: ${(p) => p.theme.maskColor};
  font-size: 18px;
`;

const Phone = styled.a`
  display: flex;
  align-items: center;
  width: 190px;
  color: ${(p) => p.theme.secondaryColor};
  margin-left: 3px;
  padding: 3px;
  border-radius: 5px;
  font-size: 20px;
  transition: background-color 200ms;

  &:hover {
    background-color: ${(p) => p.theme.backgroundHover};
  }
`;

// const Button = styled.button`
//   padding: 4px 8px;
//   margin-bottom: 5px;
//   border-radius: 5px;
//   background-color: #5e77f8;
//   color: #fff;

//   &:hover {
//     cursor: pointer;
//   }
// `;

const FloatButton = styled.button`
  position: absolute;
  top: 10px;
  right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 50%;
  color: ${(p) =>
    p.mode === "fill" ? p.theme.secondaryColor : p.theme.accentColor};
  font-size: 24px;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.backgroundHover};
  }
`;

const Prediction = styled.div`
  position: absolute;
  bottom: 19px;
  left: 13px;
  z-index: 1;
  width: 170px;
  padding: 3px;
  transform-origin: top;
  transform: translateY(100%);
  border: ${(p) => p.theme.inputBorder};
  border-radius: 10px;
  background-color: ${(p) => p.theme.secondaryColor};
`;

const PredictionItem = styled.div`
  padding: 3px;
  margin: 3px;
  border-radius: 5px;
  transition: 200ms background-color;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

const Text = styled.div``;

const SubText = styled.div`
  font-size: 14px;
  margin-top: 2px;
`;
