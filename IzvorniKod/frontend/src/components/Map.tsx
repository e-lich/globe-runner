import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";

export default function Map() {
  const data: GeoJSON.Feature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [125.6, 10.1],
    },
    properties: {},
  };

  useEffect(() => {
    map();
  }, []);

  const map = () => {
    const map = L.map("map").setView([43, 16], 9);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var myLayer = L.geoJSON().addTo(map);
    myLayer.addData(data);
  };

  return <div id="map"></div>;
}
