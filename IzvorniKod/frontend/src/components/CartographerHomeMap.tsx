import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import CartographerHomePopup from "./CartographerHomePopup";

export default function CartographerHomeMap() {
  // map variable so we can clear it at the beginning of useEffect
  var myCartographerHomeMap: L.Map | undefined;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  var [mapContainer, setMapContainer] = useState<L.Map | undefined>();

  var locations: {
    cardId: number;
    cardStatus: string;
    description: string;
    latitude: number;
    longitude: number;
    locationPhoto: string;
    title: string;
  }[];

  // MAP INITIALIZATION
  useEffect(() => {
    if (myCartographerHomeMap !== undefined && myCartographerHomeMap !== null) {
      myCartographerHomeMap.remove(); // should remove the map from UI and clean the inner children of DOM element
    }

    myCartographerHomeMap = L.map("cartographerHomeMapId");
    setMapContainer(myCartographerHomeMap);
    var tile_url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    var layer = L.tileLayer(tile_url, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    myCartographerHomeMap.addLayer(layer);

    var locationData = JSON.parse(
      localStorage.getItem("locationData") !== ""
        ? localStorage.getItem("locationData")!
        : ""
    );
    if (locationData) {
      myCartographerHomeMap.setView(
        [locationData.latitude, locationData.longitude],
        13
      );
    } else myCartographerHomeMap.setView([45.8238, 15.9761], 13);

    fetchLocations().catch(console.error);
  }, [myCartographerHomeMap]);

    const fetchLocations = async () => {
      try {
        console.log("fetching submitted locations!");
        const res = await axios.get("/locations/submitted");

      locations = res.data;
      if (locations[0].title) // TODO - update needed when no cards are submitted for refresh when last card is verified or marked
        updateMarkers(); // TODO - check if locations exist, we are checking if the first item inside the array is a card currently!
      else console.log("No submitted locations!");
    } catch (e) {
      alert(e);
    }
  };

  const handleVerify = async () => {
    var locationData = JSON.parse(localStorage.getItem("locationData")!);

    axios
      .post("/locations/verify/" + locationData.cardID, {})
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          fetchLocations().catch(console.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const handleOnSite = async () => {
    var locationData = JSON.parse(localStorage.getItem("locationData")!);

    axios
      .post("/locations/unclaim/" + locationData.cardID, {})
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          fetchLocations().catch(console.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const updateMarkers = () => {
    if (!myCartographerHomeMap) myCartographerHomeMap = mapContainer;

    console.log("updating markers!");
    // clear all markers on the map and set new ones!
    // clear all of the previous layers
    myCartographerHomeMap!.eachLayer(function (layer: any) {
      myCartographerHomeMap!.removeLayer(layer);
    });

    // add necessary layers without any markers
    var tile_url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    var layer = L.tileLayer(tile_url, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    myCartographerHomeMap!.addLayer(layer);

    var locationData = JSON.parse(
      localStorage.getItem("locationData") !== ""
        ? localStorage.getItem("locationData")!
        : ""
    );
    if (locationData) {
      myCartographerHomeMap!.setView(
        [locationData.latitude, locationData.longitude],
        13
      );
    } else myCartographerHomeMap!.setView([45.8238, 15.9761], 13);

    // MARKER OPTIONS FOR LOCATIONS
    var locationIcon = L.icon({
      iconUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
      iconSize: [25, 41], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    console.log("adding locations");
    if (locations)
      locations.forEach((locationData) => {
        console.log(locationData);
        const popupOptions = {
          maxWidth: 100, // set max-width
          className: "customPopup", // name custom popup
        };

        /// TESTIRANJE HTMLA

        let popupDiv = document.createElement("div");
        popupDiv.style.cssText =
          "display:flex;flex-direction:column;align-items:center;justify-content:center;";

        let popupImg = document.createElement("img");
        popupImg.style.cssText = "width:100px;height:100px;";
        popupImg.src = locationData.locationPhoto;
        popupImg.alt = "location photo missing";

        let popupHr = document.createElement("HR");

        let popupName = document.createElement("div");
        popupName.style.cssText =
          "display:flex;align-items:center;justify-content:center;";
        popupName.textContent = locationData.title;

        let popupEditBtn = document.createElement("button");
        popupEditBtn.onclick = function () {
          setIsPopupOpen(true);
          localStorage.setItem("locationData", JSON.stringify(locationData));
        };
        popupEditBtn.textContent = "View and edit";

        let popupVerifyBtn = document.createElement("button");
        popupVerifyBtn.onclick = function () {
          localStorage.setItem("locationData", JSON.stringify(locationData));
          handleVerify();
        };
        popupVerifyBtn.textContent = "Verify";

        let popupOnSiteBtn = document.createElement("button");
        popupOnSiteBtn.onclick = function () {
          localStorage.setItem("locationData", JSON.stringify(locationData));
          handleOnSite();
        };
        popupOnSiteBtn.textContent = "Needs on site verification";

        popupDiv.append(popupImg);
        popupDiv.append(popupHr);
        popupDiv.append(popupName);
        popupDiv.append(popupHr);
        popupDiv.append(popupEditBtn);
        popupDiv.append(popupOnSiteBtn);
        popupDiv.append(popupVerifyBtn);

        L.marker([locationData.latitude, locationData.longitude], {
          icon: locationIcon,
        }) // add the created marker to the desired coordinates with desired popup
          .bindPopup(popupDiv, popupOptions)
          .addTo(myCartographerHomeMap!);
      });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Map for viewing players' suggested locations
      </h1>
      <div id="cartographerHomeMapId"></div>
      <CartographerHomePopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        fetchLocations={fetchLocations}
      />{" "}
    </>
  );
}
