'use strict';
//load modules
const express = require('express'),
	  bodyParser = require('body-parser'),
	  router = require("./routes");

const app = express();
app.use(express.static('dist/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use('/',router);

app.listen(port,function(){
	console.log('succeed!')
});