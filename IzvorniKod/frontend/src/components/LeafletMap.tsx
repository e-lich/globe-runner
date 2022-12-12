import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function LeafletMap() {
  // map variable so we can clear it at the beginning of useEffect
  var myMap: L.Map | undefined;

  // mock location data that we need to switch with an API call
  var mockLocationData = [
    {
      lat: 45.8145,
      lng: 15.9798,
      name: "Cathedral",
      image:
        "https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-house-icon-design-template-vector-isolated-png-image_781941.jpg",
    },
    {
      lat: 45.8004,
      lng: 15.9714,
      name: "FER",
      image:
        "https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-house-icon-design-template-vector-isolated-png-image_781941.jpg",
    },
    {
      lat: 45.8138,
      lng: 15.9761,
      name: "Main Square",
      image:
        "https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-house-icon-design-template-vector-isolated-png-image_781941.jpg",
    },
  ];

  // MAP INITIALIZATION
  useEffect(() => {
    if (myMap !== undefined && myMap !== null) {
      myMap.remove(); // should remove the map from UI and clean the inner children of DOM element
      console.log(myMap); // nothing should actually happen to the value of mymap
    }

    myMap = L.map("mapid");
    var tile_url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    var layer = L.tileLayer(tile_url, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    myMap.addLayer(layer);
    myMap.setView([45.245, 17.642], 14.5);

    // MARKER OPTIONS FOR USER
    var myIcon = L.icon({
      iconUrl:
        "https://www.shareicon.net/data/512x512/2016/03/13/733024_people_512x512.png",
      iconSize: [30, 35], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [15, 35], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    var locationIcon = L.icon({
      iconUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
      iconSize: [25, 41], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [12, 35], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    // SETTING LOCATION TO CURRENT USER LOCATION WITH APPROPRIATE MARKER
    myMap
      .locate({
        setView: true,
        watch: true,
      }) /* This will return map so you can do chaining */
      .on("locationfound", function (e) {
        var marker = L.marker([e.latlng.lat, e.latlng.lng], {
          icon: myIcon,
        }).bindPopup("Your are here :)");
        var circle = L.circle([e.latlng.lat, e.latlng.lng], e.accuracy / 2, {
          weight: 1,
          color: "blue",
          fillColor: "#cacaca",
          fillOpacity: 0.2,
        });
        myMap!.addLayer(marker);
        myMap!.addLayer(circle);
      })
      .on("locationerror", function (e) {
        console.log(e);
        alert("Location access denied.");
      });

    // ADDING MOCK LOCATION DATA
    mockLocationData.forEach(
      (locationData: {
        lat: number;
        lng: number;
        name: string;
        image: string;
      }) => {
        const popupOptions = {
          maxWidth: 100, // set max-width
          className: "customPopup", // name custom popup
        };

        var customPopup =
          '<div className="cardpopup">' +
          `   <img className="cardpopup--image" src=${locationData.image} height="100px" width="100px" alt=""></img>` +
          "   <hr>" +
          `   <div class="cardpopup--name">` +
          `     <span>${locationData.name}</span>` +
          "   </div>" +
          "</div>";

        L.marker([locationData.lat, locationData.lng], { icon: locationIcon })
          .bindPopup(customPopup, popupOptions)
          .addTo(myMap!);
      }
    );
  });

  return <div id="mapid"></div>;
}
