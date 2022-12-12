import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function LeafletMap() {
  var myMap: L.Map | undefined;

  useEffect(() => {
    if (myMap !== undefined && myMap !== null) {
      myMap.remove(); // should remove the map from UI and clean the inner children of DOM element
      console.log(myMap); // nothing should actually happen to the value of mymap
    }

    myMap = L.map("mapid", {
      center: [45.245, 17.642],
      zoom: 14.5,
    });

    console.log("second");

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(myMap);

    console.log("third");
  });

  return <div id="mapid"></div>;
}
