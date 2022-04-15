const API_URL = "https://api.visicom.ua/data-api/5.0/uk/geocode.json?";
const API_KEY = "0bdd14e6a6387fff4ac09827b7d9a004";

export async function getGeodataAddress(lat, lng) {
  const radius = 20;
  const type = "adr_address,adr_street";

  return await fetch(
    `${API_URL}categories=${type}&n=${lng},${lat}&r=${radius}&key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!!data?.type) {
        if (data.type === "FeatureCollection" && !!data?.features[0]?.properties?.street)
          return {
            street: data.features[0].properties.street,
            house_number: data.features[0].properties.name,
          };
        else if (data.type === "Feature" && !!data?.properties?.street) {
          return {
            street: data.properties.street,
            house_number: data.properties.name,
          };
        } else return null;
      } else return null;
    })
    .catch((e) => console.error(e));
}

export async function getGeodataCoordinates(city, street, house) {
  const type = "adr_address";

  return await fetch(
    `${API_URL}categories=${type}&text=${city} ${street} ${house}&key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!!data?.type) {
        let lat = null;
        let lng = null;

        if (data.type === "FeatureCollection") {
          lat = data.features[0].geo_centroid.coordinates[1];
          lng = data.features[0].geo_centroid.coordinates[0];
        } else if (data.type === "Feature") {
          lat = data.geo_centroid.coordinates[1];
          lng = data.geo_centroid.coordinates[0];
        } else {
          console.log("unknown type", data);
        }

        if (lat && lng) {
          return { lat, lng };
        } else return null;
      } else console.log("found nothing", data);
    })
    .catch((e) => console.error(e));
}
