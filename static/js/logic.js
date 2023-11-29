let url="https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(url).then(response=>{
  console.log(response);
  let stations = response.data.stations;
  // Initialize an array to hold bike markers.
  let bikeMarkers = [];
  // Loop through the stations array.
  for (let index = 0; index < stations.length; index++) {
    let station=stations[index]
     // For each station, create a marker, and bind a popup with the station's name.
    let bikeMarker= L.marker([station.lat, station.lon]).
    bindPopup("<h3" + station.name + "<h3><h3>Capcacity" + station.capacity +"</h3>")

    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(bikeMarker);

  }

  let bikeStations= L.layerGroup(bikeMarkers);

  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  // Create a baseMaps object to hold the streetmap layer.

  let baseMaps = {
    "Street Map": streetmap,
      };
  // Create an overlayMaps object to hold the bikeStations layer.

  let overlayMaps = {
    "Bike Stations": bikeStations
  };

  let map=L.map("map-id", {
    center: [40.7128, -74.0059],
    zoom: 12,
    layers: [streetmap, bikeStations]
  });


  L.control.layers(baseMaps,overlayMaps,{
    collapsed:false
  }).addTo(map)


})


