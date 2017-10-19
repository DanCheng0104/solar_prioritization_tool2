

const mapboxgl = require('mapbox-gl'),
      $ = require('jquery'), 
      noUiSlider = require('nouislider'),
      layer = require('./layer.js'); 
      
mapboxgl.accessToken = 'pk.eyJ1IjoiZGNoZW5nMDEwNCIsImEiOiJjaXE0MDh2MHQwMG9xZnhtNGg0azVybGxtIn0.7jdNnbpd8kQI3qO1HfSnUg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 9,
    center: [ -118.382877, 34.284700]
});

//console.log(createLayer(mapId,type,url,sourceLayer,paintOption,filterOption));
map.addControl(new mapboxgl.NavigationControl());
let layerList = $('#basemapselections');
let inputs = $('#basemapselections li');
//TODO: try to use jquery here
//const ratioUISlider = $('#filter_ratio');
const ratioUISlider = document.getElementById('filter_ratio');
noUiSlider.create(ratioUISlider, {
  start: [ 0,53.2 ],
  connect: true,
  range: {
    'min': 0,
    'max': 53.2
  },
  tooltips:true
});

ratioUISlider.noUiSlider.on('update', function(e){
  let filter = ["all",["<=", 'peak_filte', parseFloat(e[1])],[">=", 'peak_filte', parseFloat(e[0])]];
  if (map.getLayer('bg_ratio')) {map.setFilter("bg_ratio",filter); } 
});


function addLayer(mapId,type,url,sourceLayer,paintOption,filterOption) {
  map.addLayer({
      "id": mapId,
      "type": type,
      "source": {
          type: 'vector',
          url: url
      },
      'layout': {
        'visibility': 'visible'
      },
      "source-layer":sourceLayer,
      "paint": paintOption,
      "filter": filterOption

  }); 

}
function openNav() {
  $("#mySidenav").css('width','300px');
};

function closeNav() {
    $("#mySidenav").css('width','0');
};

map.on('load', () => {
  addRatio(map);
  addDisad(map); 
  map.setFilter('bg_disad', ['==','DISADVANTA',1]);
  $('#slider_ratio').on('input', function(e) {
    map.setPaintProperty('bg_ratio', 'fill-opacity', parseInt(e.target.value, 10) / 100);
    $('#slider_ratio_value').textContent = e.target.value + '%';
  });
  openNav();
  
});

[...inputs].forEach(function (input) {
    input.onclick = switchLayer;
});

function switchLayer(layer) {
      var layerId = layer.currentTarget.id;
      $("#basemapselections li").removeClass('active')
      $(this).addClass("active");
      map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
      map.on('style.load', function() {
        addRatio(map);
        addDisad(map); 
        map.setPaintProperty('bg_ratio', 'fill-opacity', parseInt(slider_ratio.value, 10) / 100);
        let filter = ["all",["<=", 'peak_filte', parseFloat(ratioUISlider.outerText.split('\n')[1])],[">=", 'peak_filte', parseFloat(ratioUISlider.outerText.split('\n')[0])]];
        map.setFilter("bg_ratio",filter); 
  });
};
function addDisad(map) {
  const paintOption = {
          "line-color": "#e07a7a"
        },
        filterOption=["==", "DISADVANTA", ""];
  map.addLayer(layer.withFilter('bg_disad','line','mapbox://dcheng0104.4hsrb3za','bg_ratio-26u6ra','visible',paintOption,filterOption));
};
function addRatio(map) {
  const paintOption = {
                "fill-color": {
                    property: 'peak_filte',
                    stops: [
                      [3.1,'#edf8fb'],
                      [6.9,'#b2e2e2'],
                      [11.7,'#66c2a4'],
                      [18.9,'#2ca25f'],
                      [53.2,'#006d2c']
                    ]
                },
          "fill-outline-color": "#e1cdb5",
          'fill-opacity': 1
        },
        filterOption=["<", "peak_filte", 60];
  map.addLayer(layer.withFilter('bg_ratio','fill','mapbox://dcheng0104.1jlgajhk','finalgeojson','visible',paintOption,filterOption));
};