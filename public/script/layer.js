module.exports = {
	withFilter : function (mapId,mapType,url,sourceLayer,visibility,paintOption,filterOption){
		const layer = {
	      "id": mapId,
	      "type": mapType,
	      "source": {
	          type: 'vector',
	          url: url
	      },
	      'layout': {
	        'visibility': visibility
	      },
	      "source-layer":sourceLayer,
	      "paint": paintOption,
	      "filter": filterOption

	  	}

	  return layer;
	},

	noFilter : function (mapId,mapType,url,sourceLayer,visibility,paintOption){
		const layer = {
	      "id": mapId,
	      "type": mapType,
	      "source": {
	          type: 'vector',
	          url: url
	      },
	      'layout': {
	        'visibility': visibility
	      },
	      "source-layer":sourceLayer,
	      "paint": paintOption

	  	}

	  return layer;
	}  

}


