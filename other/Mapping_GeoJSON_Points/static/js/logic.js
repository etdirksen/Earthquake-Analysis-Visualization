console.log('working');

let airportData = 'https://raw.githubusercontent.com/etdirksen/13-mapping-earthquakes/Mapping_GeoJSON_Points/data/majorAirports.json'

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    username: 'mapbox',
    style_id: 'streets-v11'
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    username: 'mapbox',
    style_id: 'dark-v10'
});

let baseMaps = {
    'Street': streets,
    'Dark': dark
}

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [40.7, -94.5],
    zoom: 4,
    layers: baseMaps.Street
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data using the pointToLayer callback function.
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng)
//       .bindPopup("<h2>" + feature.properties.name + ' (' + feature.properties.faa + ")</h2><hr><h3>" + feature.properties.city + ', ' + feature.properties.country + '</h3>');
//     }

//   }).addTo(map);

L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup(
            '<h2>Airport code: ' + feature.properties.faa + '</h2><hr><h3>Airport name: ' + feature.properties.name
            );
    }
}).addTo(map);


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup(
                '<h2>Airport code: ' + feature.properties.faa + '</h2><hr><h3>Airport name: ' + feature.properties.name
            )
        }
    }
    ).addTo(map)
}
);

