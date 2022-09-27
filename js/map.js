//  Initialise map leaflet map
var map = L.map('map').setView([8,-1.00], 6);


// Add BaseMap 
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// .addTo(map);


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
}).addTo(map);


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}); 


// ************* Add various base map to a dictionary ***********
var baseLayers = {
   "OpenStreetMap": osm,
   "Streets": googleStreets,
   "Terrain" : googleTerrain,
   "Hybrid": googleHybrid,
   "Satellite" : googleSat,
};



// ****** Style for polygonLayer *******

var regionStyle = {
  color : "#FF0000",
  opacity : 0.8,
  weight : 1.2,
  fill : true,
}

var districtStyle = {
  color : "#29E20F",
  opacity : 0.5,
  weight : 1.5, 
  fillColor : "#29E20F",
  fill : true,
}

var riverStyle = {
  color : "#0034B1",
  opacity : 0.6,
  fill : true,
  fillColor : "#0034B1",
  weight : 1,
}



//***** Add GeoJSON data for Region (PolygonFeature) *******
var regionLayer = L.geoJson(region,{
  style:regionStyle,
  onEachFeature:function (feature,layer) {

    area = (turf.area(feature)/1000000).toFixed(3)

    label  = `ID: ${feature.properties.id} <br>`
    label += `Name: ${feature.properties.region} REGION <br>`
    label += `RegionCode: ${feature.properties.reg_code}<br>`
    label += `Area : ${area}SqKm `
    layer.bindPopup(label)
  }
});
// .addTo(map);


var districtLayer = L.geoJson(district, {
  style:districtStyle,
  onEachFeature:function (feature,layer) {

    area = (turf.area(feature)/1000000).toFixed(3)

    label  = `Name: ${feature.properties.REGION} REGION <br>`
    label += `District: ${feature.properties.DISTRICT} <br>`
    label += `RegionCode: ${feature.properties.DISTRICT_C} <br>`
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





 // ******* Layer control features ***********
var overlays = {
    // "Marker": marker,
    "HealthCenter" : healthCenterLayer,
    "Places" : placesLayer,
    "RailLine" : railLayer,
    "Region": regionLayer,
    "District" : districtLayer,
    "River" : riverLayer,
};



 // ***** Add WMS Data ****** 
// var wmsRiver = L.tileLayer.wms("http://localhost:8080/geoserver/Geospatial/wms", {
//     layers: 'Geospatial:Rivers',
//     format: 'image/png',
//     transparent: true
//     // attribution: "MeGa © 2022 "
// }).addTo(map);




// ****Add Layer control to map *******
L.control.layers(baseLayers, overlays,{collapsed:true}).addTo(map);

 //******Add leflet browser print control to map *********
L.control.browserPrint({position:'topleft'}).addTo(map);

 //******** Add Scale to map *******
L.control.scale({position:"bottomleft"}).addTo(map);

 // ********** Mouse hover move coordinate *********
map.on("mousemove", function(e){
  $("#coord").html(`Lat:${e.latlng.lat.toFixed(3)}, Long:${e.latlng.lng.toFixed(3)}`)
});