var OrientDB = require('orientjs');


var server = OrientDB({
    host: 'sv2lxdcimd01.corp.equinix.com',
    port: 2424,
    username: 'admin',
    password: 'admin'
});

var InstanceDB = {};

var connect = function () {
    var db = server.use({
        name: 'IAConfig',
        username: 'admin',
        password: 'admin'
    });
    return db;
};

var disconnect = function (db) {
    db.close();
};

InstanceDB.getAsset = function (assetName, callback) {
    var db = connect();
    db.select()
        .from('Instance')
        .where({ ASSET_INSTANCE_NAME: assetName })
        .all()
        .then(function (result) {
            disconnect(db);
            callback(result);
        });
};

InstanceDB.getAssets = function (callback) {
    var db = connect();
    db.select()
        .from('Instance')
        .all()
        .then(function (assets) {
            disconnect(db);
            callback(assets);
        });
};

InstanceDB.addAsset = function (asset, callback) {
    var db = connect();

    InstanceDB.getAsset(asset.ASSET_INSTANCE_NAME, function (result) {
        if (result == undefined || result.length == 0) {
            db.insert()
                .into('Instance')
                .set(asset).one()
                .then(function (record) {
                    disconnect(db);
                    callback(record);
                });
        }
        else {
            callback({ error: 'Asset already exits' });
        }
    });
};

InstanceDB.addAssets = function (assets, callback) {
    assets.forEach(function (asset) {
        InstanceDB.addAsset(asset, function (result) {
            if (!result.error) {
                console.log('asset added with template name ' + asset.Infra_Asset_template_name);
            }
        });
    });
    callback('Assets added');
};

InstanceDB.updateAsset = function (asset, callback) {
    var db = connect();
    db.update('Instance')
        .set({
            OPERATION: asset.OPERATION,
            ASSET_INSTANCE_NAME: asset.ASSET_INSTANCE_NAME,
            MAXIMO_ASSET_ID: asset.MAXIMO_ASSET_ID,
            MAXIMO_ASSET_NUM: asset.MAXIMO_ASSET_NUM,
            MAXIMO_SITE_ID: asset.MAXIMO_SITE_ID,
            serialnum: asset.serialnum,
            description: asset.description,
            vendor: asset.vendor,
            manufacturer: asset.manufacturer,
            Asset_Visible_to_Customer: asset.Asset_Visible_to_Customer,
            IBX: asset.IBX,
            PROTOCOL: asset.PROTOCOL,
            Scan_Frequency : asset.Scan_Frequency
        })
        .where({ '@rid': asset.rid })
       //.where({'ASSET_INSTANCE_NAME': asset.ASSET_INSTANCE_NAME })
        .scalar()
        .then(function (rowsAffected) {
            disconnect(db);
            if (rowsAffected > 0) {
                console.log('Record updated');
                callback({
                    message: 'Asset updated',
                    asset: asset
                });
            }
            else {
                callback({ error: 'Unable to update asset' });
            }
        });
};

InstanceDB.deleteAsset = function (asset, callback) {
    var db = connect();
    //console.log(asset);
    db.delete()
        .from('Instance')
        .where({ ASSET_INSTANCE_NAME: asset.ASSET_INSTANCE_NAME })
        .limit(1).scalar()
        .then(function (rowsAffected) {
            //console.log(rowsAffected);
            disconnect(db);
            if (rowsAffected > 0) {
                callback({
                    message: 'Asset deleted',
                    asset: asset
                });
            }
            else {
                callback({ error: 'Unable to delete asset' });
            }
        });
};

exports.InstanceDB = InstanceDB;