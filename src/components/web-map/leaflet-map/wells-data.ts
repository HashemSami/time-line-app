const wellTypes = [
  "building",
  "landing",
  "geosteering",
  "geometric",
  "operation",
];

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const generateWellsData = () => {
  const data = Array.from({ length: 200 }, () => {
    const randomLat = getRandomArbitrary(22, 27);
    const randomLng = getRandomArbitrary(47, 51);
    const randomWellTypeNo = getRandomInt(0, 5);
    const randomWellType = wellTypes[randomWellTypeNo];

    return {
      wellName: "HRDH_111_2",
      type: randomWellType,
      latlng: [randomLat, randomLng],
    };
  });
  return data;
};

export const wellsData = [
  { wellName: "HRDH_111_2", type: "building", latlng: [23.50691, 49.259089] },
  { wellName: "HRDH_111_2", type: "landing", latlng: [22.759297, 50.401788] },
  { wellName: "HRDH_111_2", type: "landing", latlng: [22.742359, 49.364074] },
  { wellName: "HRDH_111_2", type: "landing", latlng: [26.265453, 48.452787] },
  { wellName: "HRDH_111_2", type: "building", latlng: [26.010664, 47.395835] },
  { wellName: "HRDH_111_2", type: "building", latlng: [27.335938, 47.878508] },
  {
    wellName: "HRDH_111_2",
    type: "geosteering",
    latlng: [22.907751, 51.410472],
  },
  {
    wellName: "HRDH_111_2",
    type: "geosteering",
    latlng: [27.832549, 48.897916],
  },
  {
    wellName: "HRDH_111_2",
    type: "geosteering",
    latlng: [22.591983, 51.278079],
  },
  { wellName: "HRDH_111_2", type: "operation", latlng: [27.706175, 46.747948] },
  { wellName: "HRDH_111_2", type: "operation", latlng: [22.129694, 49.80161] },
];
