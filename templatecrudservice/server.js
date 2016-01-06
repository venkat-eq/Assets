/* global __dirname */
var templateDB = require('./asset.js').TemplateDB;
var Express = require('express');
var bodyParser = require('body-parser');
var server = new Express();

var Server = {};

Server.init = function () {
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.use("/js", Express.static(__dirname + '/js'));
    server.use("/fonts", Express.static(__dirname + '/fonts'));
    server.use("/css", Express.static(__dirname + '/css'));

    server.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    server.get('/asset/:assetName', function (req, res) {
        templateDB.getAsset(req.params.assetName, function (result) {
            res.send(result);
        });
    });

    server.get('/assets', function (req, res) {
        templateDB.getAssets(function (result) {
            res.send(result);
        });
    });

    server.post('/addAsset', function (req, res) {
        templateDB.addAsset(req.body, function (rec) {
            res.send(rec);
        });
    });

    server.put('/updateAsset', function (req, res) {
        templateDB.updateAsset(req.body, function (result) {
            res.send(result);
        });
    });

    server.delete('/deleteAsset', function (req, res) {
        templateDB.deleteAsset(req.body, function (result) {
            res.send(result);
        });
    });

    server.listen(1234);
    console.info('Asset CRUD API service running at http://localhost:1234');
};

exports.Server = Server;