//  Initialise map leaflet map
var map = L.map('map').setView([8,-1.00], 6);


// Add BaseMap 
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
 
var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


// Add marker in the map
var marker = L.marker([8,-1]).addTo(map);


// Add various base map to a dictinary
var baseLayers = {
   "OpenStreetMap": osm,
   "Streets": googleStreets,
   "Terrain" : googleTerrain,
   "Hybrid": googleHybrid,
   "Satellite" : googleSat
};


// Add GeoJSON data 
var regionlayer = L.geoJson(region).addTo(map);
var raillayer = L.geoJson(rail).addTo(map);
// var places = L.geoJson(places).addTo(map);


var overlays = {
    "Marker": marker,
    // "Roads": roadsLayer
};
  // Add Layer control to map
L.control.layers(baseLayers, overlays,{collapsed:true}).addTo(map);


// Add leflet browser print control to map
L.control.browserPrint({position:'topleft'}).addTo(map);


// Add Scale to map
L.control.scale({position:"bottomleft"}).addTo(map);


// Mouse hover move coordinate
map.on("mousemove", function(e){
	$("#coord").html(`Lat:${e.latlng.lat.toFixed(3)}, Long:${e.latlng.lng.toFixed(3)}`)
});

