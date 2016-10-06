'use strict';

var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

// Handle CLI
var argv = require('minimist')(process.argv.slice(2));

if (argv['help']) {
	console.log('HELP :')
	console.log('-o : Output port. Default "3000"');
	console.log('-h : Tile host. Default "localhost"');
	console.log('-p : Tile port. Default "8080"');
	console.log('-l : Tile layer. Default "GIS"');
} else {

	// get index.html
	var publicFolder = path.join(__dirname, './public/');
	var index = require('fs').readFileSync(path.join(publicFolder, './index.html'));

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
}
