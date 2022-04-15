import React, { useEffect } from "react";
import { Polygon, Tooltip, useMapEvents } from "react-leaflet";
import L from "leaflet";

export const MapPolygon = ({
  pathOptions,
  positions,
  title,
  marker,
  handleArea,
}) => {
  // const map = useMapEvents({});

  // console.log(map.fitBounds(polygon.getBounds()));

  useEffect(() => {
    // Polygon.getBounds().contains(marker);
    // handleArea(title);
  }, [marker]);

  return (
    <Polygon
      pathOptions={pathOptions}
      positions={positions}
      eventHandlers={{
        click: (e) => {
          console.log("clicked", e);
        },
      }}
    >
      <Tooltip>{title}</Tooltip>
    </Polygon>
  );
};
