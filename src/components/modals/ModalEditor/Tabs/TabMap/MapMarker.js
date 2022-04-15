import React from "react";

import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

import icon from "assets/icons/marker.svg";

const markerIcon = new L.Icon({
  iconUrl: icon,
  iconSize: [70, 70],
  iconAnchor: [35, 70],
});

export const MapMarker = ({ onChange, position }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onChange(lat, lng);
    },
  });

  return <Marker position={position} icon={markerIcon} />;
};
