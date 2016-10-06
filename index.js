'use strict';

var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);


// get index.html
var publicFolder = path.join(__dirname, './public/');
var index = require('fs').readFileSync(path.join(publicFolder, './index.html'));

// Handle CLI
var argv = require('minimist')(process.argv.slice(2));

var port = argv.o || 3000;
var tileHost = argv.h || 'http://localhost';
var tilePort = argv.p || '8080';
var tileLayer = argv.l || 'GIS'


// Handle file serving

index = index.toString()
	.replace('TILE_HOST', tileHost)
	.replace('TILE_PORT', tilePort)
	.replace('TILE_LAYER', tileLayer);

app.get('/', function (req, res) {
	res.send(index);
});


// Handle http server

server.listen(port);
console.log('listening on port', port);
console.log('Looking for tiles at', tileHost+':'+tilePort+'/'+tileLayer+'/{X}/{Y}/{Z}.json');
