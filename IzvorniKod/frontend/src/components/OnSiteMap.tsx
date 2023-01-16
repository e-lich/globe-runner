import { Button } from "@mui/material";
import axios from "axios";
import * as L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function OnSiteMap({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: Function;
}) {
  // map variable so we can clear it at the beginning of useEffect
  var myOnSiteMap: L.Map | undefined;

  var [routingControl, setRoutingControl] = useState<
    L.Routing.Control | undefined
  >();
  var [routeCreated, setRouteCreated] = useState(false);

  var [mapContainer, setMapContainer] = useState<L.Map | undefined>();

  var [dropDownValue, setDropDownValue] = useState("Unclaimed Locations");
  var dropvalue = "Unclaimed Locations";

  var locations: {
    cardID: number;
    cardStatus: string;
    description: string;
    latitude: number;
    longitude: number;
    locationPhoto: string;
    title: string;
  }[];

  // MAP INITIALIZATION
  useEffect(() => {
    if (myOnSiteMap !== undefined && myOnSiteMap !== null) {
      myOnSiteMap.remove(); // should remove the map from UI and clean the inner children of DOM element
    }

    myOnSiteMap = L.map("onSiteMapId", {
      zoomControl: false,
    });

    new L.Control.Zoom({ position: "bottomright" }).addTo(myOnSiteMap);

    setMapContainer(myOnSiteMap);
    var tile_url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    var layer = L.tileLayer(tile_url, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    myOnSiteMap.addLayer(layer);
    myOnSiteMap.setView([45.8238, 15.9761], 13);

    updateFilter();
  }, [myOnSiteMap]);

  useEffect(() => {
    if (mapContainer) {
      dropvalue = dropDownValue;
      updateFilter();
      console.log(
        "refresh use effect triggered inside map and useEffect called!"
      );
    }
  }, [refresh]);

  function updateFilter() {
    if (!myOnSiteMap) myOnSiteMap = mapContainer;
    // clear all markers on the map and set new ones!

    // clear all of the previous layers
    myOnSiteMap!.eachLayer(function (layer) {
      myOnSiteMap!.removeLayer(layer);
    });

    // add necessary layers without any markers
    var tile_url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    var layer = L.tileLayer(tile_url, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    myOnSiteMap!.addLayer(layer);
    myOnSiteMap!.setView([45.8238, 15.9761], 13);

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

    const fetchLocations = async () => {
      try {
        var res;
        console.log("dropvalue is " + dropvalue);
        if (dropvalue) {
          if (dropvalue === "Unclaimed Locations") {
            console.log("fetching unclaimed locations");
            res = await axios.get("/locations/unclaimed");
          } else if (dropvalue === "Claimed Locations") {
            console.log("fetching claimed locations");
            res = await axios.get("/locations/claimed");
          }

          if (res) {
            if (res.data[0] === "No unclaimed locations found")
              console.log(res.data[0]);
            else if (
              res.data[0] === "No claimed locations found for this cartographer"
            )
              console.log(res.data[0]);
            else {
              locations = res.data;
              updateMarkers();
            }
          }
        } else console.log("Pick a filter from the dropdown!");
      } catch (e) {
        alert(e);
      }
    };

    const handleClaim = () => {
      var locationData = JSON.parse(localStorage.getItem("locationData")!);

      axios
        .post("/locations/claim/" + locationData.cardID)
        .then((res) => {
          console.log(res);
          setRefresh((refresh: any) => !refresh);
          // if (res.data.success === true) {
          //   fetchLocations().catch(console.error);
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const updateMarkers = () => {
      if (locations)
        locations.forEach((locationData) => {
          const popupOptions = {
            maxWidth: 100, // set max-width
            className: "customPopup", // name custom popup
          };

          let popupDiv = document.createElement("div");
          popupDiv.style.cssText =
            "display:flex;flex-direction:column;align-items:center;justify-content:center;";

          let popupImg = document.createElement("img");
          popupImg.style.cssText = "width:100px;height:100px;";
          popupImg.src = locationData.locationPhoto.startsWith("http")
            ? locationData.locationPhoto
            : `data:image/jpeg;base64,${locationData.locationPhoto}`;
          popupImg.alt = "location photo missing";

          let popupHr = document.createElement("HR");

          let popupName = document.createElement("div");
          popupName.style.cssText =
            "display:flex;align-items:center;justify-content:center;";
          popupName.textContent = locationData.title;

          let popupBtn = document.createElement("button");

          popupBtn.onclick = function () {
            localStorage.setItem("locationData", JSON.stringify(locationData));
            handleClaim();
          };
          popupBtn.textContent = "Claim";

          popupDiv.append(popupImg);
          popupDiv.append(popupHr);
          popupDiv.append(popupName);
          popupDiv.append(popupHr);
          if (dropvalue === "Unclaimed Locations") popupDiv.append(popupBtn);

          L.marker([locationData.latitude, locationData.longitude], {
            icon: locationIcon,
          }) // add the created marker to the desired coordinates with desired popup
            .bindPopup(popupDiv, popupOptions)
            .addTo(myOnSiteMap!);
        });
    };

    fetchLocations();
  }

  const createRoute = async () => {
    myOnSiteMap = mapContainer;

    var waypoints: L.LatLng[];

    var res;

    console.log("fetching claimed locations");
    res = await axios.get("/locations/claimed");

    if (res) {
      if (res.data[0] === "No unclaimed locations found")
        console.log(res.data[0]);
      else if (
        res.data[0] === "No claimed locations found for this cartographer"
      )
        console.log(res.data[0]);

      locations = res.data;

      waypoints = locations.map((location) =>
        L.latLng(location.latitude, location.longitude)
      );

      var tempRoutingControl = L.Routing.control({
        plan: L.Routing.plan(waypoints, {
          createMarker: function (i, wp) {
            return L.marker(wp.latLng, {
              draggable: true,
              icon: L.icon({
                iconUrl:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
                iconSize: [25, 41], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62], // the same for the shadow
                popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
              }),
            });
          },
        }),
      });

      tempRoutingControl.addTo(myOnSiteMap!);

      setRoutingControl(tempRoutingControl);
      setRouteCreated(true);
    }
  };

  const removeRoute = () => {
    myOnSiteMap = mapContainer;

    if (routingControl != null) {
      myOnSiteMap!.removeControl(routingControl);
      routingControl = undefined;
    }

    setRouteCreated(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle
            style={{ marginLeft: 0 }}
            variant="success"
            id="dropdown-basic"
          >
            {dropDownValue ? dropDownValue : "Select filter"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setDropDownValue("Unclaimed Locations");
                dropvalue = "Unclaimed Locations";
                updateFilter();
              }}
            >
              Unclaimed Locations
            </Dropdown.Item>

            <Dropdown.Item
              onClick={async () => {
                setDropDownValue("Claimed Locations");
                dropvalue = "Claimed Locations";
                updateFilter();
              }}
            >
              Claimed Locations
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          variant="contained"
          disabled={dropDownValue !== "Claimed Locations" || routeCreated}
          color="primary"
          style={{ height: "40px", marginRight: "20px" }}
          onClick={() => createRoute()}
        >
          Create Route
        </Button>
        <Button
          variant="contained"
          disabled={!routeCreated}
          color="primary"
          style={{ height: "40px" }}
          onClick={() => removeRoute()}
        >
          Remove Route
        </Button>
      </div>

      <div id="onSiteMapId"></div>
    </>
  );
}
