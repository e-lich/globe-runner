import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function AddLocationMap({
  setLat,
  setLong,
  setUserLatitude,
  setUserLongitude,
  refresh,
  setRefresh,
}: {
  setLat: Function;
  setLong: Function;
  setUserLatitude: Function;
  setUserLongitude: Function;
  refresh: boolean;
  setRefresh: Function;
}) {
  // map variable so we can clear it at the beginning of useEffect
  var myAddLocationMap: L.Map | undefined;

  var [dropDownValue, setDropDownValue] = useState("Submitted Locations");

  var locationMarker: L.Marker<any> | undefined;
  var locationLatitude;
  var locationLongitude;

  var userLatNonState: number;
  var userLngNonState: number;

  var dropvalue = "Submitted Locations";
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

  // MAP INITIALIZATION
  useEffect(() => {
    if (myAddLocationMap !== undefined && myAddLocationMap !== null) {
      myAddLocationMap.remove(); // should remove the map from UI and clean the inner children of DOM element
    }

    myAddLocationMap = L.map("addLocationMapId");
    setMapContainer(myAddLocationMap);
    var tile_url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    var layer = L.tileLayer(tile_url, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    myAddLocationMap.addLayer(layer);
    myAddLocationMap.setView([45.8238, 15.9761], 13);

    // MARKER OPTIONS FOR USER
    var myIcon = L.icon({
      iconUrl:
        "https://www.shareicon.net/data/512x512/2016/03/13/733024_people_512x512.png",
      iconSize: [30, 35], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [15, 25], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    // SETTING LOCATION TO CURRENT USER LOCATION WITH APPROPRIATE MARKER
    myAddLocationMap
      .locate({
        setView: true,
        watch: true,
      }) /* This will return map so you can do chaining */
      .on("locationfound", function (e) {
        userLatNonState = e.latlng.lat;
        userLngNonState = e.latlng.lng;
        setUserLatitude(e.latlng.lat);
        setUserLongitude(e.latlng.lng);

        var currentMarker = L.marker([userLatNonState, userLngNonState], {
          icon: myIcon,
        }).bindPopup("Your are here :)");

        myAddLocationMap!.addLayer(currentMarker);
      })
      .on("locationerror", function (e) {
        window.location.reload();
      });

    myAddLocationMap!.on("click", addMarker);

    function addMarker(e: any) {
      console.log("drawing!");

      // remove the previous marker if it existed
      if (locationMarker) {
        myAddLocationMap!.removeLayer(locationMarker);
      }
      // Add marker to map at click location;
      var newMarker = L.marker(e.latlng, {
        icon: locationIcon,
      }).addTo(myAddLocationMap!);

      locationMarker = newMarker;

      locationLatitude = e.latlng.lat;
      setLat(e.latlng.lat);
      locationLongitude = e.latlng.lng;
      setLong(e.latlng.lng);
      console.log(
        "latitude: " + locationLatitude + ", longitude: " + locationLongitude
      );
    }

    updateFilter();
  }, [myAddLocationMap]);

  useEffect(() => {
    if (mapContainer) {
      dropvalue = dropDownValue;
      if (dropvalue == "Submitted Locations") updateFilter();
      console.log(
        "refresh use effect triggered inside map and useEffect called!"
      );
    }
  }, [refresh]);

  function updateFilter() {
    if (!myAddLocationMap) myAddLocationMap = mapContainer;

    // clear all markers on the map and set new ones!

    // clear all of the previous layers
    myAddLocationMap!.eachLayer(function (layer) {
      myAddLocationMap!.removeLayer(layer);
    });

    // MARKER OPTIONS FOR USER
    var myIcon = L.icon({
      iconUrl:
        "https://www.shareicon.net/data/512x512/2016/03/13/733024_people_512x512.png",
      iconSize: [30, 35], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [15, 25], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    // add necessary layers without any markers
    var tile_url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    var layer = L.tileLayer(tile_url, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    myAddLocationMap!.addLayer(layer);

    if (userLatNonState && userLngNonState) {
      L.marker([userLatNonState, userLngNonState], {
        icon: myIcon,
      })
        .bindPopup("Your are here :)")
        .addTo(myAddLocationMap!);

      myAddLocationMap!.setView([userLatNonState, userLngNonState], 14.5);
    }

    const fetchLocations = async () => {
      try {
        var res;
        if (dropvalue) {
          if (dropvalue === "Submitted Locations") {
            console.log("fetching submitted locations");
            res = await axios.get("/locations/submitted");
          } else if (dropvalue === "Approved Locations") {
            console.log("fetching approved locations");
            res = await axios.get("/locations/approved");
          }

          if (res) {
            if (res.data[0] === "No submitted locations found")
              console.log(res.data[0]);
            else if (res.data[0] === "No approved locations found")
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

    const updateMarkers = () => {
      if (locations)
        locations.forEach((locationData) => {
          const popupOptions = {
            maxWidth: 100, // set max-width
            className: "customPopup", // name custom popup
          };

          var customPopup =
            '<div className="cardpopup">' +
            `   <img className="cardpopup--image" src=${`data:image/jpeg;base64,${locationData.locationPhoto}`} height="100px" width="100px" alt=""></img>` +
            "   <hr>" +
            `   <div class="cardpopup--name">` +
            `     <span>${locationData.title}</span>` +
            "   </div>" +
            "</div>";

          L.marker([locationData.latitude, locationData.longitude], {
            icon: locationIcon,
          }) // add the created marker to the desired coordinates with desired popup
            .bindPopup(customPopup, popupOptions)
            .addTo(myAddLocationMap!);
        });
    };

    fetchLocations();
  }

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{ marginLeft: 0 }}
        >
          {dropDownValue ? dropDownValue : "Select filter"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={async () => {
              setDropDownValue("Submitted Locations");
              dropvalue = "Submitted Locations";
              updateFilter();
            }}
          >
            Submitted Locations
          </Dropdown.Item>

          <Dropdown.Item
            onClick={async () => {
              setDropDownValue("Approved Locations");
              dropvalue = "Approved Locations";
              updateFilter();
            }}
          >
            Approved Locations
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div id="addLocationMapId"></div>
    </>
  );
}
