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
// .addTo(map);


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}); 


// ****** Style for polygonLayer *******

var regionStyle = {
  weight : 1.5,
  fill : true,
  opacity : 0.9,
  color : "#ff0000",
  fillOpacity : 0.05,
  fillColor : "#ff0000",
}

var districtStyle = {
  weight : 1.5,
  fill : true,
  opacity : 0.9,
  color : "#00ff00",
  fillOpacity : 0.05,
  fillColor : "#00ff00",
}

var riverStyle = {
  // color : "#3401ff",
  opacity : 0.6,
  weight : 1.5, 
  fill : true,
  fillColor : "#3401ff",
}



//***** Add GeoJSON data for Region (PolygonFeature) *******
var regionLayer = L.geoJson(region,{
  style:regionStyle,
  onEachFeature:function (feature,layer) {

    area = (turf.area(feature)/1000000).toFixed(3)

    label  = `ID : ${feature.properties.id} <br>`
    label += `Region : ${feature.properties.region} REGION <br>`
    label += `RegionCode : ${feature.properties.reg_code}<br>`
    label += `Area : ${area} SqKm `
    layer.bindPopup(label)
  }
});
// .addTo(map);


var districtLayer = L.geoJson(district, {
  style:districtStyle,
  onEachFeature:function (feature,layer) {

    area = (turf.area(feature)/1000000).toFixed(3)

    label  = `District : ${feature.properties.DISTRICT} <br>`
    label += `Region : ${feature.properties.REGION} REGION <br>`
    label += `DistrictCode : ${feature.properties.DISTRICT_C} <br>`
    label += `Area : ${area} SqKm `

    layer.bindPopup(label)
  }
});
// .addTo(map);

// ** River ** 
var riverLayer = L.geoJson(river, {
  style:riverStyle,
  onEachFeature:function (feature,layer) {
    label  = `Name : ${feature.properties.name}<br>`
    // label += `Type : ${feature.properties.type}<br>`

    layer.bindPopup(label)
  }
});
// .addTo(map);

// ******** Style for pointLayer ********
//  *** HealthFacilities
var healthCenterStyle = {
  radius: 1,
  fillColor: "red",
  color : "red",
}

//  **** Places **** 
var placesStyle = {
  radius:1,
  fill : "green",
  color : "green",
  fillColor : "green",
}

// ****** Add geoJson data for pointFeatures **********

 // Add marker in the map
// var marker = L.marker([8,-1]).addTo(map);

  // ***** HealthFacility ***** 
  var healthCenterLayer = L.geoJson(healthCenter,{
   pointToLayer:function(feature, latlng) {
     return L.circleMarker(latlng,healthCenterStyle); 
  }
   });
  // .addTo(map);


  // ***** Places *****
  var placesLayer = L.geoJson(places , {
   pointToLayer: function(feature,latlng) {
    return L.circleMarker(latlng,placesStyle);
  }
   });
  // .addTo(map);



// ******* Style for polyLine ******** 
var railStyle = {
  color : "cyan",
  weight : 1.5,
  dashArray : "10, 4, 10",
}


// ********** Add GeoJson data for polylineFeatures *********
var railLayer = L.geoJson(rail,{
  style:railStyle,
  onEachFeature:function (feature,layer) {
    label  = `Name : ${feature.properties.NAME}<br>`
    // label += `Type : ${feature.properties.type}<br>`

    layer.bindPopup(label)
  }
});
// .addTo(map);


// ***** Coding the actions of the checkbox *****
var osmRadio = document.getElementById('osmRadio')
var streetRadio = document.getElementById('streetRadio')
var terrainRadio = document.getElementById('terrainRadio')
var hybridRadio = document.getElementById('hybridRadio')



// ************* Add various base map to a dictionary ***********

var baseLayers = {
   "Osm": osm,
   "Streets": googleStreets,
   "Terrain" : googleTerrain,
   "Hybrid": googleHybrid,
   // "Satellite" : googleSat,
};

// **** defining the function of the radioClick in the html
function radioClick(myRadio) {
  var selectedRadio = myRadio.id;
  if (selectedRadio == "osmRadio") baseLayers["Osm"].addTo(map)
    else map.removeLayer(baseLayers["Osm"])
  if (selectedRadio == "streetRadio") baseLayers["Streets"].addTo(map)
    else map.removeLayer(baseLayers["Streets"])
  if (selectedRadio == "terrainRadio") baseLayers["Terrain"].addTo(map)
    else map.removeLayer(baseLayers["Terrain"])
  if (selectedRadio == "hybridRadio") baseLayers["Hybrid"].addTo(map)
    else map.removeLayer(baseLayers["Hybrid"])
}


// Layer control features
var overlays = {
//     // "Marker": marker,
    "Region": regionLayer,
    "District" : districtLayer,
    "River" : riverLayer,
    // "RailLine" : railLayer,
  };
// *** coding the action of th switch ****** 
regionCheck.onclick = function () {
  if ($(this).is(':checked')) overlays["Region"].addTo(map)
    else map.removeLayer(overlays["Region"])
}

districtCheck.onclick = function () {
  if ($(this).is(':checked')) overlays["District"].addTo(map)
    else map.removeLayer(overlays["District"])
}

riverCheck.onclick =function() {
  if($(this).is(':checked')) overlays["River"].addTo(map)
    else map.removeLayer(overlays["River"])
}

// railwayCheck.onclick =function() {
//   if($(this).is(':checked')) overlays["RailLine"].addTo(map)
//     else map.removeLayer(overlays["RailLine"])
// }





 //******Add leflet browser print control to map *********
L.control.browserPrint({position:'topleft'}).addTo(map);

 //******** Add Scale to map *******
L.control.scale({position:"bottomleft"}).addTo(map);

 // ********** Mouse hover move coordinate *********
map.on("mousemove", function(e){
  $("#coord").html(`Lat:${e.latlng.lat.toFixed(3)}, Long:${e.latlng.lng.toFixed(3)}`)
});

// ****Add Layer control to map *******
// L.control.layers(baseLayers, overlays,{collapsed:true}).addTo(map);


// ******** Geolocation of User *********** //
map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy.toFixed(0);
    
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius +" meter from this point").openPopup();
        // .bindPopup("Current location !!!").openPopup();
    L.circle(e.latlng, radius).addTo(map);
}

  // ******** Display message if Geoolocation fails ******** //
map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
  }
map.on('locationerror', onLocationError);