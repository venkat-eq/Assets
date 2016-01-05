/* global __dirname */
var instanceDB = require('./asset.js').InstanceDB;
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
        instanceDB.getAsset(req.params.assetName, function (result) {
            res.send(result);
        });
    });

    server.get('/assets', function (req, res) {
        instanceDB.getAssets(function (result) {
            res.send(result);
        });
    });

    server.post('/addAsset', function (req, res) {
        instanceDB.addAsset(req.body, function (rec) {
            res.send(rec);
        });
    });

    server.put('/updateAsset', function (req, res) {
        instanceDB.updateAsset(req.body, function (result) {
            res.send(result);
        });
    });

    server.delete('/deleteAsset', function (req, res) {
        instanceDB.deleteAsset(req.body, function (result) {
            res.send(result);
        });
    });

    server.listen(4567);
    console.info('Asset CRUD API service running at http://localhost:4567');
};

exports.Server = Server;