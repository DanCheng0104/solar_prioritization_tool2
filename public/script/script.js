const mapboxgl = require('mapbox-gl'),
      $ = require('jquery'),
      noUiSlider = require('nouislider');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGNoZW5nMDEwNCIsImEiOiJjaXE0MDh2MHQwMG9xZnhtNGg0azVybGxtIn0.7jdNnbpd8kQI3qO1HfSnUg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 9,
    center: [ -118.382877, 34.284700]
});

map.addControl(new mapboxgl.NavigationControl());
// const toggleableLayerIds = ['circuits','solar','SCE_Service','bg_avg_cir'];
const layerList = document.getElementById('basemapselections');
const inputs = layerList.getElementsByTagName('li');
const ratioSlider = document.getElementById('slider_ratio');
const ratioSliderValue = document.getElementById('slider_ratio_value');

const ratioUISlider = document.getElementById('filter_ratio');
noUiSlider.create(ratioUISlider, {
  start: [ 0,1 ],
  connect: true,
  range: {
    'min': 0,
    'max': 1
  },
  tooltips:true
});

ratioUISlider.noUiSlider.on('update', function(e){
  let filter = ["all",["<=", 'ram_r', parseFloat(e[1])],[">=", 'ram_r', parseFloat(e[0])]];
  if (map.getLayer('bg_ratio')) {map.setFilter("bg_ratio",filter); } 
});

  
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
};

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};

map.on('load', function () {
  addRatio(map);
  addDisad(map); 
  map.setFilter('bg_disad', ['==','DISADVANTA',1]);
  ratioSlider.addEventListener('input', function(e) {
    map.setPaintProperty('bg_ratio', 'fill-opacity', parseInt(e.target.value, 10) / 100);
    ratioSliderValue.textContent = e.target.value + '%';
  });
  openNav();
  
});
// toggleLayers_checkbox(); 

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
        let filter = ["all",["<=", 'ram_r', parseFloat(ratioUISlider.outerText.split('\n')[1])],[">=", 'ram_r', parseFloat(ratioUISlider.outerText.split('\n')[0])]];
        map.setFilter("bg_ratio",filter); 
  });
};
function addDisad(map) {
   map.addLayer({
          "id": "bg_disad",
          "type": "line",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.33grf7fi'
          },
          'layout': {
            'visibility': 'visible'
          },
          "source-layer":"bg_ratio-agv186",
          "paint": {
              "line-color": "#e07a7a"
              },
          "filter": ["==", "DISADVANTA", ""]

      }); 

};
function addRatio(map) {
    map.addLayer({
        "id": "bg_ratio",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://dcheng0104.33grf7fi'
        },
        'layout': {
            'visibility': 'visible'
        },
        "source-layer":"bg_ratio-agv186",
        "paint": {
                "fill-color": {
                    property: 'ram_r',
                    stops: [
                      [0.2,'#edf8fb'],
                      [0.4,'#b2e2e2'],
                      [0.6,'#66c2a4'],
                      [0.8,'#2ca25f'],
                      [1,'#006d2c']
                    ]
                },
          "fill-outline-color": "#e1cdb5",
          'fill-opacity': 1
            }

    });

};
