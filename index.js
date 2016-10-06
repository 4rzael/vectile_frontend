'use strict';

var path = require('path');
var express = require('express');


var app = express();
var server = require('http').createServer(app);

// récupère le nom complet du sous-dossier public/
var publicFolder = path.join(__dirname, './public/');

// toutes les requêtes à des fichiers (html, js, css, etc) iront les chercher dans le dossier public
app.use(express.static(publicFolder));


var port = process.env.PORT || 3000;

server.listen(port);
console.log('listening on port', port);
