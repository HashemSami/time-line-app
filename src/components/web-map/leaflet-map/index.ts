import L, { LeafletEvent, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { wellsData, generateWellsData } from "./wells-data";
import { rigSvg } from "../../../icons/rig";

const rigMapIcon = (wellType: string) => {
  // return L.icon({
  //   iconUrl: Rig,
  //   iconSize: [20, 60],
  //   shadowSize: [50, 64],
  //   iconAnchor: [22, 94],
  //   shadowAnchor: [4, 62],
  //   popupAnchor: [-3, -76],
  //   className: "building_well",
  // });

  return L.divIcon({
    className: `well_icon ${wellType}_well no_show`,
    html: rigSvg,
  });
};

const createTiles = (map: L.Map) => {
  // Tile type: openstreetmap normal
  const openstreetmap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 7,
      minZoom: 4,
    }
  );

  // Tile type: openstreetmap Hot
  const openstreetmapHot = L.tileLayer(
    "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 7,
      minZoom: 4,
    }
  );

  // Tile type: openstreetmap Osm
  const openstreetmapOsm = L.tileLayer(
    "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 7,
      minZoom: 4,
    }
  );

  //Base layers definition and addition
  const allOptions = {
    "Open streetmap": openstreetmap,
    "Open streetmap: Hot": openstreetmapHot,
    "Open streetmap: Osm": openstreetmapOsm,
  };

  // Initialize with openstreetmap
  openstreetmap.addTo(map);

  // Add baseLayers to map as control layers
  L.control.layers(allOptions).addTo(map);
};

const getLatlngClickEvent = (map: L.Map) => {
  map.on("click", (event) => {
    const e = event as LeafletMouseEvent;
    console.log(e.latlng.toString());
    L.marker(e.latlng).addTo(map).bindPopup(e.latlng.toString());
  });

  // contextmenu is the right click button
  // map.on('contextmenu',()=>{

  // })
};

const creatWells = (map: L.Map) => {
  const markers: L.Marker<any>[] = [];
  generateWellsData().forEach((well) => {
    const marker = L.marker([well.latlng[0], well.latlng[1]], {
      icon: rigMapIcon(well.type),
    }).addTo(map);

    markers.push(marker);
  });

  const wellsMarkersGroup = L.layerGroup(markers);
  map.addLayer(wellsMarkersGroup);
};

export const map = (divElement: HTMLDivElement) => {
  const initialState = {
    lng: 46,
    lat: 24,
    zoom: 6,
  };
  const map = L.map(divElement).setView(
    [initialState.lat, initialState.lng],
    initialState.zoom
  );

  return {
    createTiles: () => createTiles(map),
    getLatlngClickEvent: () => getLatlngClickEvent(map),
    creatWells: () => creatWells(map),
  };
};
