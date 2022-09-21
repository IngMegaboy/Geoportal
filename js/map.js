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


// Add various base map to a dictinary
var baseLayers = {
   "OpenStreetMap": osm,
   "Streets": googleStreets,
   "Terrain" : googleTerrain,
   "Hybrid": googleHybrid,
   "Satellite" : googleSat,
};





// ****** Style for polygonLayer *******
var regionStyle = {
  color : "red",
  opacity : 0.9,
  weight : 2,
  fill : true,
}

var districtStyle = {
  color : "cyan",
  opacity : 0.9,
  weight : 1.5, 
  fillColor : "cyan",
  fill : true,
}



// ******** Style for pointLayer ********

// var healthCenterStyle = {
//   radius: 4,
//   fillColor: "red",
//   color : "red",
// }

// var placesStyle = {
//   radius:2,
//   fill : "green",
//   color : "green",
//   fillColor : "green",
// }



// ******* Style for polyLine ******** 
var railStyle = {
  color : "yellow",
  weight : 3,
}

var riverStyle = {
  color : "blue",
  opacity : 1,
  fill : true,
  fillColor : "blue",
}


//***** Add GeoJSON data for Region (PolygonFeature) *******
var regionLayer = L.geoJson(region,{
  style:regionStyle,
  onEachFeature:function (feature,layer) {
    layer.bindPopup(feature.properties.region)
  }
}).addTo(map);


var districtLayer = L.geoJson(district, {
  style:districtStyle,
  onEachFeature:function (feature,layer) {
    layer.bindPopup(feature.properties.DISTRICT)
  }
}).addTo(map);


// Add GeoJson data for polylineFeatures *********
var railLayer = L.geoJson(rail,{
  style:railStyle,
  onEachFeature:function (feature,layer) {
    layer.bindPopup(feature.properties.NAME)
  }
}).addTo(map);


var riverLayer = L.geoJson(river, {
  style:riverStyle,
  onEachFeature:function (feature,layer) {
    layer.bindPopup(feature.properties.name)
  }
}).addTo(map);



// ****** Add geoJson data for pointFeatures **********

// Add marker in the map
// var marker = L.marker([8,-1]).addTo(map);


 // var healthCenterLayer = L.geoJson(healthCenter,{
 //  pointToLayer:function(feature, latlng) {
 //  return L.circleMarker(latlng,healthCenterStyle); 
 // }
 //  }).addTo(map);


 // var placesLayer = L.geoJson(places , {
 //  pointToLayer: function(feature,latlng) {
 //    return L.circleMarker(latlng,placesStyle);
 //  }
 // }).addTo(map);




// Layer control features
var overlays = {
    // "Marker": marker,
    // "HealthCenter" : healthCenterLayer,
    // "Places" : placesLayer,
    "RailLine" : railLayer,
    "Region": regionLayer,
    "District" : districtLayer,
    "River" : riverLayer,
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

