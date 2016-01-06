var OrientDB = require('orientjs');


var server = OrientDB({
    host: 'sv2lxdcimd01.corp.equinix.com',
    port: 2424,
    username: 'admin',
    password: 'admin'
});

var TemplateDB = {};

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

TemplateDB.getAsset = function (assetName, callback) {
    var db = connect();
    db.select()
        .from('Template')
        .where({ Infra_Asset_Template_Name: assetName })
        .all()
        .then(function (result) {
            disconnect(db);
            callback(result);
        });
};

TemplateDB.getAssets = function (callback) {
    var db = connect();
    db.select()
        .from('Template')
        .all()
        .then(function (assets) {
            disconnect(db);
            callback(assets);
        });
};

TemplateDB.addAsset = function (asset, callback) {
    var db = connect();

    TemplateDB.getAsset(asset.Infra_Asset_Template_Name, function (result) {
        if (result == undefined || result.length == 0) {
            db.insert()
                .into('Template')
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

TemplateDB.addAssets = function (assets, callback) {
    assets.forEach(function (asset) {
        TemplateDB.addAsset(asset, function (result) {
            if (!result.error) {
                console.log('asset added with template name ' + asset.Infra_Asset_Template_Name);
            }
        });
    });
    callback('Assets added');
};

TemplateDB.updateAsset = function (asset, callback) {
    var db = connect();
    db.update('Template')
        .set({
            Operations: asset.OPERATIONS,
            Infra_Asset_Template_Name: asset.Infra_Asset_Template_Name,
            Asset_Classification: asset.Asset_Classification,
            Maximo: asset.Maximo,
            Location_Vector: asset.Location_Vector,
            ATTRIBUTE_1: asset.ATTRIBUTE_1,
            ATTRIBUTE_2: asset.ATTRIBUTE_2,
            ATTRIBUTE_3: asset.ATTRIBUTE_3,
            ATTRIBUTE_4: asset.ATTRIBUTE_4,
            Asset_Image_Simple_Graphical_View: asset.Asset_Image_Simple_Graphical_View,
            Image_Advanced_graphical_View: asset.Image_Advanced_graphical_View
        })
        .where({ '@rid': asset.rid })
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

TemplateDB.deleteAsset = function (asset, callback) {
    var db = connect();
    //console.log(asset);
    db.delete()
        .from('Template')
        .where({ Infra_Asset_Template_Name: asset.Infra_Asset_Template_Name })
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

exports.TemplateDB = TemplateDB;