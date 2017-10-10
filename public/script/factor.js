const mapboxgl = require('mapbox-gl'),
      syncMove = require('mapbox-gl-sync-move'),
      $ = require('jquery'),
      Chart = require('chart.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGNoZW5nMDEwNCIsImEiOiJjaXE0MDh2MHQwMG9xZnhtNGg0azVybGxtIn0.7jdNnbpd8kQI3qO1HfSnUg';

const map1 = new mapboxgl.Map({
    container: 'map1',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 9,
    center: [-118.246911, 34.056604]
});


const map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/dcheng0104/cj2m42yu7002r2rqn6xcy1lke',
    zoom: 9,
    center: [-118.246911, 34.056604]
});


const map3 = new mapboxgl.Map({
    container: 'map3',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 9,
    center: [-118.246911, 34.056604]
});


const map4 = new mapboxgl.Map({
    container: 'map4',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 9,
    center: [-118.246911, 34.056604]
});

syncMove(map1, map2);
syncMove(map1, map3);
syncMove(map1, map4);
syncMove(map2, map4);
syncMove(map2, map3);
syncMove(map3, map4);

map1.addControl(new mapboxgl.NavigationControl());
map2.addControl(new mapboxgl.NavigationControl());
map3.addControl(new mapboxgl.NavigationControl());
map4.addControl(new mapboxgl.NavigationControl());
map1.on('load', function () {
      map1.addLayer({
          "id": "bg_percent15",
          "type": "fill",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.d4bi5x4w'
          },
          'layout': {
              'visibility': 'visible'
          },
          "source-layer":"bg_percent15-7zu5df",
          "paint": {
                  "fill-color": {
                      property: 'PERCENT15',
                      stops: [
                        [0.29,'#edf8fb'],
                        [0.80,'#b2e2e2'],
                        [1.81,'#66c2a4'],
                        [4.55,'#2ca25f'],
                        [10.5,'#006d2c']
                      ]
                  },
            "fill-outline-color": "#e1cdb5",
            'fill-opacity': 1
              }

      });

        map1.addLayer({
          "id": "map1_hover",
          "type": "line",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.d4bi5x4w'
          },
          "source-layer":"bg_percent15-7zu5df",
          "paint": {
              "line-color": "black"
              },
          "filter": ["==", "FIPS", ""]

      }); 
});

map2.on('load', function () {
      map2.addLayer({
          "id": "bg_solar",
          "type": "fill",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.bfbcjann'
          },
          'layout': {
              'visibility': 'visible'
          },
          "source-layer":"bg_solar_update-6x2l7n",
          
          "paint": {
                  "fill-color": {
                      property: 'netsolar',
                      stops: [
                        [6291660.000000,'#edf8fb'],
                        [19164000.000000,'#b3cde3'],
                        [52151800.000000,'#8c96c6'],
                        [109041000.000000,'#8856a7'],
                        [375473984.000000,'#810f7c']
                      ]
                  },
            "fill-outline-color": "#e1cdb5",
            'fill-opacity': 1
              }
      });
      map2.setFilter('bg_solar', ['!in','NET_SOLAR_',-7777,-8888,-9999]);
      map2.addLayer({
          "id": "map2_hover",
          "type": "line",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.7wrd3lha'
          },
          "source-layer":"bg_solar-by3e7k",
          "paint": {
              "line-color": "black"
              },
          "filter": ["==", "FIPS", ""]

      }); 
 });

map3.on('load', function () {
      map3.addLayer({
          "id": "bg_disadv",
          "type": "fill",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.9zit5n1p'
          },
          'layout': {
              'visibility': 'visible'
          },
          "source-layer":"bg_disad-ac3cl4",
          "paint": {
                  "fill-color": {
                      property: 'score',
                      stops: [
                        [1,'#fee5d9'],
                        [2,'#fcae91'],
                        [3,'#fb6a4a'],
                        [4,'#de2d26'],
                        [5,'#a50f15'],
                      ]

                  },
                  "fill-outline-color": "#e1cdb5",
            'fill-opacity': 1
              }  
      });
      map3.addLayer({
          "id": "map3_hover",
          "type": "line",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.0ah4kd9n'
          },
          "source-layer":"bg-9wo2yu",
          "paint": {
              "line-color": "black"
              },
          "filter": ["==", "ID", ""]

      });     

      map3.addLayer({
          "id": "map3_base",
          "type": "line",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.d4bi5x4w'
          },          
          'layout': {
              'visibility': 'visible'
          },
          "source-layer":"bg_percent15-7zu5df",
          "paint": {
              "line-color": "#fee5d9"
              },

      }); 

});

function createBarChart(data){
  var ctx = document.getElementById('pie').getContext('2d');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      legend: {labels:{fontColor:"black", fontSize: 16,fontFamily:'Arial'}},
      scales: {
        xAxes: [{
            gridLines: {display:false}
        }],
        yAxes: [{
          position: "left",
          "id": "y-axis-0",
          gridLines: {display:false}
        }, {
          position: "right",
          "id": "y-axis-1",
          gridLines: {display:false}
        }]
      }
    }
  });

}
map1.on("click",function(e){
  const queryLayers = ['bg_percent15'];
  let features = map1.queryRenderedFeatures(e.point, { layers: queryLayers});
  if (features.length){
    map1.setFilter("map1_hover", ["==", "FIPS", features[0].properties.FIPS]);   
    let propDic = {'AREA_SUITA':'Suitable Solar Rooftop Area','BLD_TOTAL':'Total Rooftop Area'};
    let html = '<div>';
    Object.keys(propDic).forEach((elem)=>{
        html = html + '<div style = "background-color:#e4dfdf">' + propDic[elem] + '  :</div>' +'<div>'+(+features[0].properties[elem.toUpperCase()].toFixed(0)).toLocaleString('en') + ' sqft</div></div><div>'
         },propDic,features)
         html=html.slice(0,html.length-5);
         let popup = new mapboxgl.Popup()
                        .setLngLat(map1.unproject(e.point))
                        .setHTML(html)
                        .addTo(map1);
      } else {
        console.log('re');
        map1.setFilter("map1_hover", ["==", "FIPS", ""]);       
      }         
  
});

map2.on("click", function(e) {
      const queryLayers = ['bg_solar'];
      let features = map2.queryRenderedFeatures(e.point, { layers: queryLayers});
      if (features.length) {  
         map2.setFilter("map2_hover", ["==", "FIPS", features[0].properties.FIPS]);   
         let usetypes = ['COMM','CONDO','INST','MF','MIX','OTHER','RESO','SF','IND'];
         let usetypesDisplay = {'COMM':'Commercial','CONDO':'Condo','INST':'Institutional','MF':'Multi Family','MIX':'Mixed Use','OTHER':'Other','RESO':'Residential Other','SF':'Single Family','IND':'Industrial'}
         let div = document.createElement('canvas');
         div.id = 'pie';
         let data = {labels:[],datasets:[]}
         let datasets = [];
         let usetypeData = {label:'No. of Parcels', data:[], yAxisID: "y-axis-0",backgroundColor:'#7fcdbb'};
         let usetypeSqft = {label:'Total Sqft of Parcels', data:[], yAxisID: "y-axis-1",backgroundColor:'#fc9272'};

         let pop = features[0].properties.POP2010;
         usetypes.forEach((usetype)=>{
           if (features[0].properties[usetype] > 0 & features[0].properties['SQFT_' + usetype] > 0) {
              usetypeData.data.push(features[0].properties[usetype]);
              usetypeSqft.data.push(features[0].properties['SQFT_' + usetype]);
              data.labels.push(usetypesDisplay[usetype]);
            }

         },features);
         data.datasets.push(usetypeData);
         data.datasets.push(usetypeSqft);
         let popup = new mapboxgl.Popup()
        .setLngLat(map2.unproject(e.point))
        .setDOMContent(div)
        .addTo(map2);
        $('#pie').ready(function (e) {
            createBarChart(data,pop);
        },data);
      } else {
         map2.setFilter("map2_hover", ["==", "FIPS", ""]);       
      }
  });


map3.on("click", function(e) {
      const queryLayers = ['bg_disadv'];
      let features = map3.queryRenderedFeatures(e.point, { layers: queryLayers});
      if (features.length) {
         map3.setFilter("map3_hover", ["==", "ID", features[0].properties.ID]);   
         // let propDic = {'OZONE_PCTL':'Ozone','PM_2_5_PCT':'PM 2.5','DIESEL_PM':'Diesel','PEST_PCTL':'Pesticides','TR_PCTL':'Toxic Releases','TRAFF_PCTL':'Traffic','DW_PCTL':'Drinking Water','CLEAN_PCTL':'Cleanups','GW_PCTL':'Groundwater Threats','HAZ_PCTL':'Hazardous Waste','LBW_PCTL':'Low Birth Weight','CVD_PCTL':'Cardiovascular Disease:','EDU_PCTL':'Education','Ling_pctl':'Linguistic Isolation','Pov_pctl':'Poverty','Unem_pctl':'Unemployment','HB_pctl':'Housing Burden'} 
         let propDic = {'DW_PCTL':'Drinking Water','CLEAN_PCTL':'Cleanups','GW_PCTL':'Groundwater Threats','HAZ_PCTL':'Hazardous Waste','LBW_PCTL':'Low Birth Weight','EDU_PCTL':'Education','Ling_pctl':'Linguistic Isolation','Pov_pctl':'Poverty','Unem_pctl':'Unemployment','HB_pctl':'Housing Burden'}
         let html = '<div>'
         Object.keys(propDic).forEach((elem)=>{
            html = html + '<div style = "background-color:#e4dfdf">' + propDic[elem] + '  :</div>' +'<div>'+features[0].properties[elem.toUpperCase()] + '</div></div><div>'

         },propDic,features)
         html=html.slice(0,html.length-5);
         let popup = new mapboxgl.Popup()
                        .setLngLat(map3.unproject(e.point))
                        .setHTML(html)
                        .addTo(map3);
      } else {
         map3.setFilter("map3_hover", ["==", "ID", ""]);       
      }
  });


map4.on('load', function () {
      map4.addLayer({
          "id": "bg_base",
          "type": "fill",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.0ah4kd9n'
          },
          'layout': {
              'visibility': 'none'
          },
          "source-layer":"bg-9wo2yu",
          "paint": {
                  "fill-color": {
                      property: 'INCOME_QUI',
                      stops: [
                        [1,'#feebe2'],
                        [2,'#fbb4b9'],
                        [3,'#f768a1'],
                        [4,'#c51b8a'],
                        [5,'#7a0177'],
                      ]

                  },
                  "fill-outline-color": "#e1cdb5",
            'fill-opacity': 1
              }  
      });
      map4.addLayer({
          "id": "bg_pop",
          "type": "fill",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.0ah4kd9n'
          },
          'layout': {
              'visibility': 'visible'
          },
          "source-layer":"bg-9wo2yu",
          "paint": {
                  "fill-color": {
                      property: 'POP2010',
                      stops: [
                        [1119,'#f6eff7'],
                        [1697,'#bdc9e1'],
                        [2436,'#67a9cf'],
                        [3847,'#1c9099'],
                        [9344,'#016c59'],
                      ]

                  },
                  "fill-outline-color": "#e1cdb5",
            'fill-opacity': 1
              }  
      });
      map4.addLayer({
          "id": "map4_hover",
          "type": "line",
          "source": {
              type: 'vector',
              url: 'mapbox://dcheng0104.0ah4kd9n'
          },
          "source-layer":"bg-9wo2yu",
          "paint": {
              "line-color": "black"
              },
          "filter": ["==", "ID", ""]

      });     

});

// map3 description
let atag3 =  document.getElementById('info3');
let close3 = document.getElementById('close3');
let modal3 = document.getElementById('modal3');

atag3.addEventListener('click', openInfo3);
close3.addEventListener('click', closeInfo3);
function openInfo3(){
  modal3.style.display = "block";
}
function closeInfo3() {
    modal3.style.display = "none";
}

// map4 description
let atag4 =  document.getElementById('info4');
let close4 = document.getElementById('close4');
let modal4 = document.getElementById('modal4');

atag4.addEventListener('click', openInfo4);
close4.addEventListener('click', closeInfo4);
function openInfo4(){
  modal4.style.display = "block";
}
function closeInfo4() {
    modal4.style.display = "none";
}
// map1 description

let atag1 =  document.getElementById('info1');
let close1 = document.getElementById('close1');
let modal1 = document.getElementById('modal1');
atag1.addEventListener('click', openInfo1);
close1.addEventListener('click', closeInfo1);
function openInfo1(){
  modal1.style.display = "block";
}
function closeInfo1() {
    modal1.style.display = "none";
}
// map2 description
let atag2 =  document.getElementById('info2');
let close2 = document.getElementById('close2');
let modal2 = document.getElementById('modal2');
atag2.addEventListener('click', openInfo2);
close2.addEventListener('click', closeInfo2);
function openInfo2(){
  modal2.style.display = "block";
}
function closeInfo2() {
    modal2.style.display = "none";
}

$('#income').click(function() {
  console.log('back');
  map4.setLayoutProperty('bg_pop', 'visibility', 'none');
  map4.setLayoutProperty('bg_base', 'visibility', 'visible');
  $('#pop')[0].checked= false;
  document.getElementById('popLegend').style.display = 'none';
  document.getElementById('incomeLegend').style.display = '';
});

$('#pop').click(function() {
  console.log('back');
  map4.setLayoutProperty('bg_pop', 'visibility', 'visible');
  map4.setLayoutProperty('bg_base', 'visibility', 'none');
  $('#income')[0].checked= false;
  document.getElementById('popLegend').style.display = '';
  document.getElementById('incomeLegend').style.display = 'none';

});
let arrow1 = document.getElementById('arrow1')
arrow1.addEventListener('click', switchLegend1);

function switchLegend1(){
  let height = document.getElementById("map1_legend").style.height;
  let legend = document.getElementById("map1_legend").style;
  let info = document.getElementById("info1").style;
  let arrow = document.getElementById("arrow1").children[0];
  let body = document.getElementById("body1").style;
  if (height =="" || height !=="30px") {
    legend.height = "30px";
    info.display = "none";
    body.display = "none";
    arrow.className='glyphicon glyphicon-chevron-up';
  }
  else {
    legend.height = "200px";
    info.display = "";  
    body.display = "";
    arrow.className='glyphicon glyphicon-chevron-down'; 
  }
}

let arrow2 = document.getElementById('arrow2')
arrow2.addEventListener('click', switchLegend2);

function switchLegend2(){
  let height = document.getElementById("map2_legend").style.height;
  let legend = document.getElementById("map2_legend").style;
  let info = document.getElementById("info2").style;
  let arrow = document.getElementById("arrow2").children[0];
  let body = document.getElementById("body2").style;
  if (height =="" || height !=="30px") {
    legend.height = "30px";
    info.display = "none";
    body.display = "none";
    arrow.className='glyphicon glyphicon-chevron-up';
  }
  else {
    legend.height = "200px";
    info.display = "";  
    arrow.className='glyphicon glyphicon-chevron-down'; 
    body.display = ""; 
  }
}

let arrow3 = document.getElementById('arrow3')
arrow3.addEventListener('click', switchLegend3);

function switchLegend3(){
  let height = document.getElementById("map3_legend").style.height;
  let legend = document.getElementById("map3_legend").style;
  let info = document.getElementById("info3").style;
  let arrow = document.getElementById("arrow3").children[0];
  let body = document.getElementById("body3").style;
  if (height =="" || height !=="30px") {
    legend.height = "30px";
    info.display = "none";
    body.display = "none";
    arrow.className='glyphicon glyphicon-chevron-up';
  }
  else {
    legend.height = "200px";
    info.display = "";  
    arrow.className='glyphicon glyphicon-chevron-down'; 
    body.display = ""; 
  }
}

let arrow4 = document.getElementById('arrow4')
arrow4.addEventListener('click', switchLegend4);

function switchLegend4(){
  let height = document.getElementById("map4_legend").style.height;
  let legend = document.getElementById("map4_legend").style;
  let info = document.getElementById("info4").style;
  let arrow = document.getElementById("arrow4").children[0];
  let body = document.getElementById("body4").style;
  if (height =="" || height !=="30px") {
    legend.height = "30px";
    info.display = "none";
    body.display = "none";
    arrow.className='glyphicon glyphicon-chevron-up';
  }
  else {
    legend.height = "200px";
    info.display = ""; 
    body.display = ""; 
    arrow.className='glyphicon glyphicon-chevron-down'; 
  }
}


