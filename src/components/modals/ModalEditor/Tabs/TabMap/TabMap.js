import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { updateOrderAddress } from "store/actions/order";

import { MapMarker } from "./MapMarker";
import { ViewOnClick } from "./ViewOnClick";
import { MapPolygon } from "./MapPolygon";

import {
  getGeodataAddress,
  getGeodataCoordinates,
} from "utils/helpers/geocoding";

// ! delete temp imports
// * dont forget
import { polygon1, polygon2 } from "./temp.js";

const TabMap = () => {
  const dispatch = useDispatch();

  const address = useSelector((state) => state.order.data.address);
  const { latitude, longitude } = address;

  const searchForCoorinates = async () => {
    const { city_sync_id, street, house_number } = address;
    const data = await getGeodataCoordinates(
      city_sync_id,
      street,
      house_number
    );

    if (data) {
      dispatch(updateOrderAddress("latitude", data.lat));
      dispatch(updateOrderAddress("longitude", data.lng));
    }
  };

  const parseCoordinates = () => {
    if (!!latitude && !!longitude)
      return [parseFloat(latitude), parseFloat(longitude)];
    return [49.843335, 24.026595];
  };

  const handleChangeCoordinates = async (lat, lng) => {
    const data = await getGeodataAddress(lat, lng);

    if (data) {
      dispatch(updateOrderAddress("street", data.street));
      dispatch(updateOrderAddress("house_number", data.house_number));
    }

    dispatch(updateOrderAddress("latitude", lat));
    dispatch(updateOrderAddress("longitude", lng));
  };

  const handleArea = (title) => {
    console.log(title);
  };

  return (
    <Wrapper>
      <ButtonSearch onClick={searchForCoorinates}>
        Знайти координати
      </ButtonSearch>

      <MapContainer
        style={{ height: "100%", width: "100%", borderRadius: 10 }}
        center={parseCoordinates()}
        zoom={14}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MapMarker
          onChange={handleChangeCoordinates}
          position={parseCoordinates()}
        />
        <MapPolygon
          pathOptions={{ color: "red" }}
          positions={polygon1.paths}
          title={polygon1.title}
          marker={parseCoordinates()}
          handleArea={handleArea}
        />
        <MapPolygon
          pathOptions={{ color: "green" }}
          positions={polygon2.paths}
          title={polygon2.title}
          marker={parseCoordinates()}
          handleArea={handleArea}
        />
        <ViewOnClick position={parseCoordinates()} />
      </MapContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transform-origin: right top;
  height: 100vh;
  top: 0;
  right: 460px;
  width: 460px;
  padding: 10px;
  background-color: ${(p) => p.theme.background};
`;

const ButtonSearch = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  background-color: #eca23f;
`;

export default React.memo(TabMap);
