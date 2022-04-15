import { useEffect } from "react";

import { useMapEvents } from "react-leaflet";

export const ViewOnClick = ({ position }) => {
  const map = useMapEvents({});

  useEffect(() => {
    map.setView(position);
  }, [position]);

  return null;
};
