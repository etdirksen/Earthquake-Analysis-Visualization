console.log('working');

let torontoData = 'https://raw.githubusercontent.com/etdirksen/13-mapping-earthquakes/Mapping_GeoJSON_Linestrings/data/torontoRoutes.json';

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    username: 'mapbox',
    style_id: 'streets-v11'
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    username: 'mapbox',
    style_id: 'satellite-streets-v11'
});

let baseMaps = {
    'Streets': streets,
    'Sattelite Streets': satelliteStreets
}

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: baseMaps.satelliteStreets
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2,
    opacity: .5
}


// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    console.log('still working');

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h3>Airline: ${feature.properties.airline}</h3><hr><h3>Destination: ${feature.properties.dst}</h3>`);
        }
    }).addTo(map);
});