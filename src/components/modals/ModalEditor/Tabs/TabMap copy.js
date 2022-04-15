import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";

import { updateOrderAddress } from "store/actions/order";

const API_KEY = "AIzaSyAlOTGOPRI3wZKLhHL_g699NFwQmS662Lk";
const API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

const paths = [
  { lng: 24.103214, lat: 49.835582 },
  { lng: 24.109393, lat: 49.833281 },
  { lng: 24.113169, lat: 49.833439 },
  { lng: 24.112597, lat: 49.839384 },
  { lng: 24.112951, lat: 49.840216 },
  { lng: 24.114979, lat: 49.840714 },
  { lng: 24.118312, lat: 49.841524 },
  { lng: 24.118234, lat: 49.842968 },
  { lng: 24.117998, lat: 49.843452 },
  { lng: 24.115959, lat: 49.84371 },
  { lng: 24.113298, lat: 49.844033 },
  { lng: 24.110708, lat: 49.843694 },
  { lng: 24.107567, lat: 49.84296 },
  { lng: 24.106421, lat: 49.847492 },
  { lng: 24.106159, lat: 49.848509 },
  { lng: 24.10956, lat: 49.84934 },
  { lng: 24.109388, lat: 49.849411 },
  { lng: 24.109131, lat: 49.849659 },
  { lng: 24.108352, lat: 49.850222 },
  { lng: 24.1046, lat: 49.8534 },
  { lng: 24.103097, lat: 49.856436 },
  { lng: 24.105714, lat: 49.857467 },
  { lng: 24.101376, lat: 49.860812 },
  { lng: 24.100862, lat: 49.86214 },
  { lng: 24.097699, lat: 49.865726 },
  { lng: 24.095767, lat: 49.86655 },
  { lng: 24.092052, lat: 49.869241 },
  { lng: 24.081359, lat: 49.868438 },
  { lng: 24.06367, lat: 49.877715 },
  { lng: 24.020393, lat: 49.888872 },
  { lng: 23.999707, lat: 49.889758 },
  { lng: 23.979365, lat: 49.891858 },
  { lng: 23.977047, lat: 49.890766 },
  { lng: 23.975351, lat: 49.890102 },
  { lng: 23.974215, lat: 49.88912 },
  { lng: 23.973681, lat: 49.889158 },
  { lng: 23.972413, lat: 49.889314 },
  { lng: 23.96851, lat: 49.889116 },
  { lng: 23.964422, lat: 49.888502 },
  { lng: 23.960778, lat: 49.888549 },
  { lng: 23.952499, lat: 49.887876 },
  { lng: 23.923402, lat: 49.879304 },
  { lng: 23.91542, lat: 49.874271 },
  { lng: 23.914997, lat: 49.856121 },
  { lng: 23.917813, lat: 49.854025 },
  { lng: 23.926855, lat: 49.854482 },
  { lng: 23.940388, lat: 49.856736 },
  { lng: 23.954444, lat: 49.857797 },
  { lng: 23.968268, lat: 49.856859 },
  { lng: 23.980117, lat: 49.852877 },
  { lng: 23.981901, lat: 49.852676 },
  { lng: 23.985531, lat: 49.852282 },
  { lng: 23.98663, lat: 49.852034 },
  { lng: 23.9931, lat: 49.850044 },
  { lng: 23.99619, lat: 49.848676 },
  { lng: 23.997871, lat: 49.848151 },
  { lng: 23.999287, lat: 49.847698 },
  { lng: 24.000121, lat: 49.847785 },
  { lng: 24.000618, lat: 49.847775 },
  { lng: 24.00166, lat: 49.847161 },
  { lng: 24.002455, lat: 49.846941 },
  { lng: 24.004022, lat: 49.846553 },
  { lng: 24.005502, lat: 49.845942 },
  { lng: 24.006442, lat: 49.845427 },
  { lng: 24.008099, lat: 49.844644 },
  { lng: 24.008879, lat: 49.844361 },
  { lng: 24.009444, lat: 49.844154 },
  { lng: 24.009804, lat: 49.844042 },
  { lng: 24.010002, lat: 49.843954 },
  { lng: 24.012583, lat: 49.843391 },
  { lng: 24.015073, lat: 49.842845 },
  { lng: 24.018377, lat: 49.842541 },
  { lng: 24.01857, lat: 49.840631 },
  { lng: 24.017311, lat: 49.839332 },
  { lng: 24.015965, lat: 49.837936 },
  { lng: 24.018339, lat: 49.836896 },
  { lng: 24.019361, lat: 49.836547 },
  { lng: 24.020005, lat: 49.836027 },
  { lng: 24.019592, lat: 49.8353 },
  { lng: 24.020482, lat: 49.83458 },
  { lng: 24.023737, lat: 49.835218 },
  { lng: 24.025845, lat: 49.831172 },
  { lng: 24.029873, lat: 49.829986 },
  { lng: 24.034581, lat: 49.829531 },
  { lng: 24.036019, lat: 49.827813 },
  { lng: 24.038958, lat: 49.825632 },
  { lng: 24.044142, lat: 49.822271 },
  { lng: 24.048675, lat: 49.821577 },
  { lng: 24.053924, lat: 49.823833 },
  { lng: 24.055397, lat: 49.823319 },
  { lng: 24.069986, lat: 49.821282 },
  { lng: 24.083501, lat: 49.81952 },
  { lng: 24.096541, lat: 49.817488 },
  { lng: 24.105126, lat: 49.817942 },
  { lng: 24.105427, lat: 49.818781 },
  { lng: 24.105923, lat: 49.820311 },
  { lng: 24.105988, lat: 49.821343 },
  { lng: 24.106322, lat: 49.822958 },
  { lng: 24.102974, lat: 49.826948 },
  { lng: 24.101474, lat: 49.827942 },
  { lng: 24.101248, lat: 49.829772 },
  { lng: 24.097546, lat: 49.831704 },
  { lng: 24.096778, lat: 49.833196 },
  { lng: 24.096088, lat: 49.836796 },
  { lng: 24.103214, lat: 49.835582 },
];

const options = {
  fillColor: "RGBA(49, 221, 147, 0.2)",
  fillOpacity: 1,
  strokeColor: "RGBA(82, 145, 90, 1)",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

export const TabMap = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.order.data.address);

  const handleSetMarker = (e) => {
    const coordinates = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    fetch(
      `${API_URL}?latlng=${coordinates.lat},${coordinates.lng}&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const a = data.results[0].address_components;

        dispatch(updateOrderAddress("street", a[1].long_name));
        dispatch(updateOrderAddress("house_number", a[0].long_name));
      })
      .catch((e) => console.error(e));

    dispatch(updateOrderAddress("latitude", coordinates.lat));
    dispatch(updateOrderAddress("longitude", coordinates.lng));
  };

  const handleSearch = () => {
    const { city_sync_id, street, house_number } = address;
    const serachString = `${city_sync_id} ${street} ${house_number}`;

    fetch(`${API_URL}?address=${serachString}&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          updateOrderAddress("latitude", data.results[0].geometry.location.lat)
        );
        dispatch(
          updateOrderAddress("longitude", data.results[0].geometry.location.lng)
        );
      });
  };

  const handleMarker = () => {
    if (!!address.latitude && !!address.longitude)
      return {
        lat: parseFloat(address.latitude),
        lng: parseFloat(address.longitude),
      };
    return {
      lat: 49.843335,
      lng: 24.026595,
    };
  };

  return (
    <Wrapper>
      <LoadScript googleMapsApiKey={API_KEY}>
        <ButtonSearch onClick={handleSearch}>Пошук геолокації</ButtonSearch>
        <GoogleMap
          id='data-example'
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
          zoom={16}
          center={handleMarker()}
          onClick={handleSetMarker}
          clickableIcons={false}
        >
          <Polygon editable={false} paths={paths} options={options} />
          <Marker position={handleMarker()} />
        </GoogleMap>
      </LoadScript>
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
