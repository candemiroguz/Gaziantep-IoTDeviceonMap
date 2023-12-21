//Harita Yükle
let map = L.map('map', {
    center: [37.038250, 37.334227],
    zoom: 11,
    zoomControl: false,
});

map.attributionControl.setPrefix('')

  //Logo Tanımı Yap
let IoTLogo = L.icon({
  iconUrl: '/img/broadcast_85838.png',
  iconSize: [38,38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
})

let LayerManagementLogo = L.icon({
  iconUrl: '/img/layericon.png',
  iconSize: [44,44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -22]
})
  // Altlık Harita Ekle
let OSMMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Developed by &copy; candemiroguz &mdash;'
}).addTo(map);
let googleStreetsMap = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
  subdomains:['mt0','mt1','mt2','mt3']
});
let googleHybritMap = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
  subdomains:['mt0','mt1','mt2','mt3']
});
let googleSatelliteMap = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  subdomains:['mt0','mt1','mt2','mt3'],
  maxZoom: 25
});
let googleTerrainMap = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
  subdomains:['mt0','mt1','mt2','mt3']
});
 
//TomTom Traffic API Ekle
const TomTomApiKEY = ''
let TomTomApiUrl = `https://api.tomtom.com/traffic/map/4/tile/flow/absolute/{z}/{x}/{y}.png?view=Unified&key=${TomTomApiKEY}`
let TomTomTraffic = L.tileLayer(TomTomApiUrl
);


//İstasyon Koordinatları Tanımlanması
const istasyon1 = [37.073416, 37.372116];
const istasyon2 = [37.076628, 37.349693];
const istasyon3 = [37.013255, 37.376328];
const istasyon4 = [37.032382, 37.322402];
const istasyon7 = [36.992779, 37.315095];

// İstasyonların Marker Olarak Haritada Gösterilmesi
let istasyon_1 = L.marker(istasyon1, {icon: IoTLogo});
let istasyon_2 = L.marker(istasyon2, {icon: IoTLogo});
let istasyon_3 = L.marker(istasyon3, {icon: IoTLogo});
let istasyon_4 = L.marker(istasyon4, {icon: IoTLogo});
let istasyon_7 = L.marker(istasyon7, {icon: IoTLogo});

let IoTDevices = L.layerGroup([istasyon_1, istasyon_2, istasyon_3, istasyon_4, istasyon_7]);

let baseMaps = {
  "OpenStreetMap": OSMMap,
  "Google Satellite" : googleSatelliteMap,
  // "Google Street" : googleStreetsMap,
  // "Google Hybrit" : googleHybritMap,
  // "Google Terrain" : googleTerrainMap,
  
  
}

// let IoTDevices = {
//   "İstasyon 1" : istasyon_1,
//   "İstasyon 2" : istasyon_2,
//   "İstasyon 3" : istasyon_3,
//   "İstasyon 4" : istasyon_4,
//   "İstasyon 7" : istasyon_7,
 
// } 

let overlayMaps = {
  "IoT Cihazları": IoTDevices,
  "Trafik Datası": TomTomTraffic

};

let layerControl = L.control.layers(baseMaps,overlayMaps).addTo(map);

//API İstasyon Numaraları Tanımla
const stations = new Array("1","2","3","4","7");

// API'den IoT Verileri için Request gönder
function GetGaziantepOpenData () {
let request = new XMLHttpRequest();
request.open('GET', 'https://opendataapi.gaziantep.bel.tr/api/Environment/GetEnvironmentDtos');
request.onload = function() {
  if (request.status === 200) {
    let data = JSON.parse(request.responseText);


    let last5DataArray = [];
    for (let station of stations) {
      let filteredData = data.filter(function(e) {
        return e.istasyonNo === station;
      });
      let last5Data = filteredData.slice(0);
      last5DataArray = last5DataArray.concat(last5Data);
    }

      let getstation1values = last5DataArray.filter(element => element.istasyonNo == '1');
      let getstation2values = last5DataArray.filter(element => element.istasyonNo == '2');
      let getstation3values = last5DataArray.filter(element => element.istasyonNo == '3');
      let getstation4values = last5DataArray.filter(element => element.istasyonNo == '4');
      let getstation7values = last5DataArray.filter(element => element.istasyonNo == '7');



      let station1keys = Object.keys(getstation1values[0])
      let station1values = Object.values(getstation1values[0])
      let station2keys = Object.keys(getstation2values[0])
      let station2values = Object.values(getstation2values[0])
      let station3keys = Object.keys(getstation3values[0])
      let station3values = Object.values(getstation3values[0])
      let station4keys = Object.keys(getstation4values[0])
      let station4values = Object.values(getstation4values[0])
      let station7keys = Object.keys(getstation7values[0])
      let station7values = Object.values(getstation7values[0])

    //İstasyon Attributeleri Düzenle
      istasyon_1.bindPopup("IoT İstasyon 1" 
                          + '<br>' 
                          + station1keys[1] + ':' +station1values[1]
                          + '<br>'
                          + station1keys[2] + ':' +station1values[2]
                          + '<br>' 
                          + station1keys[3] + ':' +station1values[3]
                          + '<br>'
                          + station1keys[4] + ':' +station1values[4]
                          + '<br>'
                          + station1keys[5] + ':' +station1values[5]
                          + '<br>' 
                          + station1keys[6] + ':' +station1values[6]
                          + '<br>'
                          + station1keys[7] + ':' +station1values[7]);
      istasyon_2.bindPopup("IoT İstasyon 2" 
                          + '<br>' 
                          + station2keys[1] + ':' +station2values[1]
                          + '<br>'
                          + station2keys[2] + ':' +station2values[2]
                          + '<br>' 
                          + station2keys[3] + ':' +station2values[3]
                          + '<br>'
                          + station2keys[4] + ':' +station2values[4]
                          + '<br>'
                          + station2keys[5] + ':' +station2values[5]
                          + '<br>' 
                          + station2keys[6] + ':' +station2values[6]
                          + '<br>'
                          + station2keys[7] + ':' +station2values[7]);
      istasyon_3.bindPopup("IoT İstasyon 3" 
                          + '<br>' 
                          + station3keys[1] + ':' +station3values[1]
                          + '<br>'
                          + station3keys[2] + ':' +station3values[2]
                          + '<br>' 
                          + station3keys[3] + ':' +station3values[3]
                          + '<br>'
                          + station3keys[4] + ':' +station3values[4]
                          + '<br>'
                          + station3keys[5] + ':' +station3values[5]
                          + '<br>' 
                          + station3keys[6] + ':' +station3values[6]
                          + '<br>'
                          + station3keys[7] + ':' +station3values[7]);
      istasyon_4.bindPopup("IoT İstasyon 4" 
                          + '<br>' 
                          + station4keys[1] + ':' +station4values[1]
                          + '<br>'
                          + station4keys[2] + ':' +station4values[2]
                          + '<br>' 
                          + station4keys[3] + ':' +station4values[3]
                          + '<br>'
                          + station4keys[4] + ':' +station4values[4]
                          + '<br>'
                          + station4keys[5] + ':' +station4values[5]
                          + '<br>' 
                          + station4keys[6] + ':' +station4values[6]
                          + '<br>'
                          + station4keys[7] + ':' +station4values[7]);
      istasyon_7.bindPopup("IoT İstasyon 7" 
                          + '<br>' 
                          + station7keys[1] + ':' +station7values[1]
                          + '<br>'
                          + station7keys[2] + ':' +station7values[2]
                          + '<br>' 
                          + station7keys[3] + ':' +station7values[3]
                          + '<br>'
                          + station7keys[4] + ':' +station7values[4]
                          + '<br>'
                          + station7keys[5] + ':' +station7values[5]
                          + '<br>' 
                          + station7keys[6] + ':' +station7values[6]
                          + '<br>'
                          + station7keys[7] + ':' +station7values[7]);



  Anlikortsicaklik= Math.round(((parseFloat(station1values[1])+parseFloat(station2values[1])+parseFloat(station3values[1])+parseFloat(station4values[1])+parseFloat(station7values[1]))/5)*1000)/1000
  Anlikortbasinc= Math.round(((parseFloat(station1values[2])+parseFloat(station2values[2])+parseFloat(station3values[2])+parseFloat(station4values[2])+parseFloat(station7values[2]))/5)*1000)/1000
  Anlikortnem= Math.round(((parseFloat(station1values[3])+parseFloat(station2values[3])+parseFloat(station3values[3])+parseFloat(station4values[3])+parseFloat(station7values[3]))/5)*1000)/1000
  Anlikortppm= Math.round(((parseFloat(station1values[4])+parseFloat(station2values[4])+parseFloat(station3values[4])+parseFloat(station4values[4])+parseFloat(station7values[4]))/5)*1000)/1000

  
  let ortsicaklikhtml = "Ort. Sıcaklik" + " : " + `${Anlikortsicaklik}` + "°C"
  document.querySelector('.Sicaklik').innerHTML = ortsicaklikhtml
  let ortbasinchtml = "Ort. Basınç" + " : " + `${Anlikortbasinc}` +""
  document.querySelector('.Basinc').innerHTML = ortbasinchtml
  let ortnemhtml = "Ort. Nem" + " : " + `${Anlikortnem}`
  document.querySelector('.Nem').innerHTML = ortnemhtml
  let ortppmhtml = "Ort. PPM" + " : " + `${Anlikortppm}`
  document.querySelector('.PPM').innerHTML = ortppmhtml

  }
};
request.send();
};

setInterval(GetGaziantepOpenData, 5000);

// console.log(last5Data)

