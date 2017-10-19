const mapboxgl = require('mapbox-gl'),
      syncMove = require('mapbox-gl-sync-move'),
      $ = require('jquery'),
      Chart = require('chart.js'),
      layer = require('./layer.js');

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
  const paintOption = {
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
        };
  if (!map1.getLayer('bg_solar')){
    map1.addLayer(layer.noFilter('bg_solar','fill','mapbox://dcheng0104.d4bi5x4w','bg_percent15-7zu5df','visible',paintOption));
    map1.addLayer(layer.withFilter('map1_hover','line','mapbox://dcheng0104.d4bi5x4w','bg_percent15-7zu5df','visible',{"line-color": "black"},["==", "FIPS", ""]));

  }
});

map1.on('style.load', function() {
    if (map1.getStyle().name === 'map1') {
      const paintOption2 = {
          "fill-color": {
             property: 'mwh',
             stops: [
                    [6030.2,'#f6eff7'],
                    [11592.69,'#bdc9e1'],
                    [18502.01,'#67a9cf'],
                    [27298.49,'#1c9099'],
                    [55976,'#016c59']
                  ]
              },
              "fill-outline-color": "#e1cdb5",
              'fill-opacity': 1
          };
      map1.addLayer(layer.noFilter('bg_demand','fill','mapbox://dcheng0104.10mik2bs','cirgroupgeojson','visible',paintOption2));      
    }
    else if(map1.getStyle().name === 'Mapbox Dark' & !map1.getLayer('bg_solar')){
      const paintOption = {
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
            };

      map1.addLayer(layer.noFilter('bg_solar','fill','mapbox://dcheng0104.d4bi5x4w','bg_percent15-7zu5df','visible',paintOption));
      map1.addLayer(layer.withFilter('map1_hover','line','mapbox://dcheng0104.d4bi5x4w','bg_percent15-7zu5df','visible',{"line-color": "black"},["==", "FIPS", ""]));

    }


});

map2.on('load', function () {
  const paintOption ={
        "fill-color": {
            property: 'netsolar',
            stops: [
              [6291.66,'#edf8fb'],
              [19164,'#b3cde3'],
              [52151.8,'#8c96c6'],
              [109041,'#8856a7'],
              [375473.984,'#810f7c']
            ]
          }};
  map2.addLayer(layer.noFilter('bg_solar','fill','mapbox://dcheng0104.72rdrfrm','bg_solar_update1-4gt26j','visible',paintOption));
  map2.setFilter('bg_solar', ['!in','NET_SOLAR_',-7777,-8888,-9999]);
  map2.addLayer(layer.withFilter('map2_hover','line','mapbox://dcheng0104.7wrd3lha','bg_solar-by3e7k','visible',{"line-color": "black"},["==", "FIPS", ""]));     
 });

map3.on('load', function () {
  const paintOption = {
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
        } ;
  map3.addLayer(layer.noFilter('bg_disadv','fill','mapbox://dcheng0104.9zit5n1p','bg_disad-ac3cl4','visible',paintOption));
  map3.addLayer(layer.withFilter('map3_hover','line','mapbox://dcheng0104.0ah4kd9n','bg-9wo2yu','visible',{"line-color": "black"},["==", "ID", ""]));  
  map3.addLayer(layer.noFilter('map3_base','line','mapbox://dcheng0104.d4bi5x4w','bg_percent15-7zu5df','visible',{"line-color": "#fee5d9"}));  

});

function createBarChart(data){
  var ctx = $('#pie')[0].getContext('2d');

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
  const queryLayers = ['bg_solar'];
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
  const paintOption1 = {
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
  map4.addLayer(layer.noFilter('bg_income','fill','mapbox://dcheng0104.0ah4kd9n','bg-9wo2yu','none',paintOption1));
  const paintOption2 =  {
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
    map4.addLayer(layer.noFilter('bg_pop','fill','mapbox://dcheng0104.0ah4kd9n','bg-9wo2yu','visible',paintOption2));
    map4.addLayer(layer.withFilter('map4_hover','line','mapbox://dcheng0104.0ah4kd9n','bg-9wo2yu','visible',{"line-color": "black"},["==", "ID", ""]));

});

const infos = ['#info1','#info2','#info3','#info4'];

infos.forEach((info,index)=>{
  $(info).on('click', function(){$(`#modal${index+1}`).show();});
})

const closes = ['#close1','#close2','#close3','#close4'];

closes.forEach((close,index)=>{
  $(close).on('click', function(){$(`#modal${index+1}`).hide();});
})

$('#income').click(function() {
  switchMap4('income');
});

$('#pop').click(function() {
  switchMap4('pop');
});

$('#demand').click(function() {
   map1.setStyle('mapbox://styles/dcheng0104/cj8xdcn6kh1gf2rqntjfed2ek');
   switchMap1('demand');
});

$('#solar').click(function() {
   map1.setStyle('mapbox://styles/mapbox/dark-v9');
   switchMap1('solar');
});

function switchMap1(displayLayer){
  const hideLayer = (displayLayer === 'solar')?'demand' :'solar';  
  // map4.setLayoutProperty(`bg_${hideLayer}`, 'visibility', 'none');
  // map4.setLayoutProperty(`bg_${displayLayer}`, 'visibility', 'visible');
  $(`#${hideLayer}`)[0].checked= false;
  $(`#${hideLayer}Legend`).hide();
  $(`#${displayLayer}Legend`).show();
}
function switchMap4(displayLayer){
  const hideLayer = (displayLayer === 'pop')?'income' :'pop';
  map4.setLayoutProperty(`bg_${hideLayer}`, 'visibility', 'none');
  map4.setLayoutProperty(`bg_${displayLayer}`, 'visibility', 'visible');
  $(`#${hideLayer}`)[0].checked= false;
  $(`#${hideLayer}Legend`).hide();
  $(`#${displayLayer}Legend`).show();

}
function switchLegend(number){
  const height = $(`#map${number}_legend`).css('height');
  if (height =="" || height !=="30px") {
    $(`#map${number}_legend`).css('height',"30px");
    $(`#info${number}`).hide();
    $(`#body${number}`).hide();
    $(`#arrow${number}`)[0].children[0].className='glyphicon glyphicon-chevron-up';
  }
  else {
    $(`#map${number}_legend`).css('height',"200px");
    $(`#info${number}`).show();
    $(`#body${number}`).show();
    $(`#arrow${number}`)[0].children[0].className='glyphicon glyphicon-chevron-down';
  }
}

const arrows = ['#arrow1','#arrow2','#arrow3','#arrow4'];

arrows.forEach((arrow,index)=>{
  $(arrow).on('click', function(){switchLegend(index+1)});
})





